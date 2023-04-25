import ini from 'ini';
import jwtDecode from 'jwt-decode';
import get from 'lodash/get';
import intersection from 'lodash/intersection';
import pick from 'lodash/pick';
import React, { useCallback } from 'react';

import {
  AccessTokenError,
  APIError,
  basename,
  entriesByFiles,
  getLargeMediaFilteredMediaFiles,
  getLargeMediaPatternsFromGitAttributesFile,
  getPointerFileForMediaFileObj,
  parsePointerFile,
  unsentRequest,
} from '@staticcms/core/lib/util';
import { API as BitBucketAPI, BitbucketBackend } from '../bitbucket';
import { GitHubBackend } from '../github';
import { GitLabBackend } from '../gitlab';
import AuthenticationPage from './AuthenticationPage';
import GitHubAPI from './GitHubAPI';
import GitLabAPI from './GitLabAPI';
import { getClient } from './netlify-lfs-client';

import type {
  AuthenticationPageProps,
  BackendClass,
  BackendEntry,
  Config,
  Credentials,
  DisplayURL,
  DisplayURLObject,
  ImplementationFile,
  PersistOptions,
  TranslatedProps,
  User,
} from '@staticcms/core/interface';
import type { ApiRequest, Cursor } from '@staticcms/core/lib/util';
import type AssetProxy from '@staticcms/core/valueObjects/AssetProxy';
import type { Client } from './netlify-lfs-client';

const STATUS_PAGE = 'https://www.netlifystatus.com';
const GIT_GATEWAY_STATUS_ENDPOINT = `${STATUS_PAGE}/api/v2/components.json`;
const GIT_GATEWAY_OPERATIONAL_UNITS = ['Git Gateway'];
type GitGatewayStatus = {
  id: string;
  name: string;
  status: string;
};

type NetlifyIdentity = {
  logout: () => void;
  currentUser: () => User;
  on: (
    eventName: 'init' | 'login' | 'logout' | 'error',
    callback: (input?: unknown) => void,
  ) => void;
  init: () => void;
  store: { user: unknown; modal: { page: string }; saving: boolean };
  open: () => void;
  close: () => void;
};

type AuthClient = {
  logout: () => void;
  currentUser: () => unknown;
  login?: (email: string, password: string, remember?: boolean) => Promise<User>;
  clearStore: () => void;
};

declare global {
  interface Window {
    netlifyIdentity?: NetlifyIdentity;
  }
}

const localHosts: Record<string, boolean> = {
  localhost: true,
  '127.0.0.1': true,
  '0.0.0.0': true,
};
const defaults = {
  identity: '/.netlify/identity',
  gateway: '/.netlify/git',
  largeMedia: '/.netlify/large-media',
};

function getEndpoint(endpoint: string, netlifySiteURL: string | null) {
  if (
    localHosts[document.location.host.split(':').shift() as string] &&
    netlifySiteURL &&
    endpoint.match(/^\/\.netlify\//)
  ) {
    const parts = [];
    if (netlifySiteURL) {
      parts.push(netlifySiteURL);
      if (!netlifySiteURL.match(/\/$/)) {
        parts.push('/');
      }
    }
    parts.push(endpoint.replace(/^\//, ''));
    return parts.join('');
  }
  return endpoint;
}

interface NetlifyUser extends Credentials {
  jwt: () => Promise<string>;
  email: string;
  user_metadata: { full_name: string; avatar_url: string };
}

export default class GitGateway implements BackendClass {
  config: Config;
  api?: GitHubAPI | GitLabAPI | BitBucketAPI;
  branch: string;
  mediaFolder?: string;
  transformImages: boolean;
  gatewayUrl: string;
  netlifyLargeMediaURL: string;
  backendType: string | null;
  apiUrl: string;
  authClient?: AuthClient;
  backend: GitHubBackend | GitLabBackend | BitbucketBackend | null;
  acceptRoles?: string[];
  tokenPromise?: () => Promise<string>;
  _largeMediaClientPromise?: Promise<Client>;

  options: {
    proxied: boolean;
    API: GitHubAPI | GitLabAPI | BitBucketAPI | null;
  };
  constructor(config: Config, options = {}) {
    this.options = {
      proxied: true,
      API: null,
      ...options,
    };
    this.config = config;
    this.branch = config.backend.branch?.trim() || 'main';
    this.mediaFolder = config.media_folder;
    const { use_large_media_transforms_in_media_library: transformImages = true } = config.backend;
    this.transformImages = transformImages;

    const netlifySiteURL = localStorage.getItem('netlifySiteURL');
    this.apiUrl = getEndpoint(config.backend.identity_url || defaults.identity, netlifySiteURL);
    this.gatewayUrl = getEndpoint(config.backend.gateway_url || defaults.gateway, netlifySiteURL);
    this.netlifyLargeMediaURL = getEndpoint(
      config.backend.large_media_url || defaults.largeMedia,
      netlifySiteURL,
    );
    const backendTypeRegex = /\/(github|gitlab|bitbucket)\/?$/;
    const backendTypeMatches = this.gatewayUrl.match(backendTypeRegex);
    if (backendTypeMatches) {
      this.backendType = backendTypeMatches[1];
      this.gatewayUrl = this.gatewayUrl.replace(backendTypeRegex, '');
    } else {
      this.backendType = null;
    }

    this.backend = null;
  }

  isGitBackend() {
    return true;
  }

  async status() {
    const api = await fetch(GIT_GATEWAY_STATUS_ENDPOINT)
      .then(res => res.json())
      .then(res => {
        return res['components']
          .filter((statusComponent: GitGatewayStatus) =>
            GIT_GATEWAY_OPERATIONAL_UNITS.includes(statusComponent.name),
          )
          .every((statusComponent: GitGatewayStatus) => statusComponent.status === 'operational');
      })
      .catch(e => {
        console.warn('[StaticCMS] Failed getting Git Gateway status', e);
        return true;
      });

    let auth = false;
    // no need to check auth if api is down
    if (api) {
      auth =
        (await this.tokenPromise?.()
          .then(token => !!token)
          .catch(e => {
            console.warn('[StaticCMS] Failed getting Identity token', e);
            return false;
          })) || false;
    }

    return { auth: { status: auth }, api: { status: api, statusPage: STATUS_PAGE } };
  }

  async getAuthClient() {
    if (this.authClient) {
      return this.authClient;
    }
    this.authClient = {
      logout: () => window.netlifyIdentity?.logout(),
      currentUser: () => window.netlifyIdentity?.currentUser(),
      clearStore: () => {
        const store = window.netlifyIdentity?.store;
        if (store) {
          store.user = null;
          store.modal.page = 'login';
          store.saving = false;
        }
      },
    };
  }

  requestFunction = (req: ApiRequest) =>
    this.tokenPromise!()
      .then(
        token => unsentRequest.withHeaders({ Authorization: `Bearer ${token}` }, req) as ApiRequest,
      )
      .then(unsentRequest.performRequest);

  authenticate(credentials: Credentials) {
    const user = credentials as NetlifyUser;
    this.tokenPromise = async () => {
      try {
        const func = user.jwt.bind(user);
        const token = await func();
        return token;
      } catch (error: unknown) {
        if (error instanceof Error) {
          throw new AccessTokenError(`Failed getting access token: ${error.message}`);
        }

        throw new AccessTokenError('Failed getting access token');
      }
    };
    return this.tokenPromise!().then(async token => {
      if (!this.backendType) {
        const {
          github_enabled: githubEnabled,
          gitlab_enabled: gitlabEnabled,
          bitbucket_enabled: bitbucketEnabled,
          roles,
        } = await unsentRequest
          .fetchWithTimeout(`${this.gatewayUrl}/settings`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(async res => {
            const contentType = res.headers.get('Content-Type') || '';
            if (!contentType.includes('application/json') && !contentType.includes('text/json')) {
              throw new APIError(
                `Your Git Gateway backend is not returning valid settings. Please make sure it is enabled.`,
                res.status,
                'Git Gateway',
              );
            }
            const body = await res.json();

            if (!res.ok) {
              throw new APIError(
                `Git Gateway Error: ${body.message ? body.message : body}`,
                res.status,
                'Git Gateway',
              );
            }

            return body;
          });
        this.acceptRoles = roles;
        if (githubEnabled) {
          this.backendType = 'github';
        } else if (gitlabEnabled) {
          this.backendType = 'gitlab';
        } else if (bitbucketEnabled) {
          this.backendType = 'bitbucket';
        }
      }

      if (this.acceptRoles && this.acceptRoles.length > 0) {
        const userRoles = get(jwtDecode(token), 'app_metadata.roles', []);
        const validRole = intersection(userRoles, this.acceptRoles).length > 0;
        if (!validRole) {
          throw new Error("You don't have sufficient permissions to access Static CMS");
        }
      }

      const userData = {
        name: user.user_metadata.full_name || user.email.split('@').shift()!,
        email: user.email,
        avatar_url: user.user_metadata.avatar_url,
        metadata: user.user_metadata,
      };
      const apiConfig = {
        apiRoot: `${this.gatewayUrl}/${this.backendType}`,
        branch: this.branch,
        tokenPromise: this.tokenPromise!,
        commitAuthor: pick(userData, ['name', 'email']),
        isLargeMedia: (filename: string) => this.isLargeMediaFile(filename),
      };

      if (this.backendType === 'github') {
        this.api = new GitHubAPI(apiConfig);
        this.backend = new GitHubBackend(this.config, { ...this.options, API: this.api });
      } else if (this.backendType === 'gitlab') {
        this.api = new GitLabAPI(apiConfig);
        this.backend = new GitLabBackend(this.config, { ...this.options, API: this.api });
      } else if (this.backendType === 'bitbucket') {
        this.api = new BitBucketAPI({
          ...apiConfig,
          requestFunction: this.requestFunction,
          hasWriteAccess: async () => true,
        });
        this.backend = new BitbucketBackend(this.config, { ...this.options, API: this.api });
      }

      if (!(await this.api!.hasWriteAccess())) {
        throw new Error("You don't have sufficient permissions to access Static CMS");
      }
      return { name: userData.name, login: userData.email } as User;
    });
  }

  async restoreUser() {
    const client = await this.getAuthClient();
    const user = client?.currentUser();
    if (!user) {
      return Promise.reject();
    }
    return this.authenticate(user as Credentials);
  }

  authComponent() {
    const WrappedAuthenticationPage = (props: TranslatedProps<AuthenticationPageProps>) => {
      const handleAuth = useCallback(
        async (email: string, password: string): Promise<User | string> => {
          try {
            const authClient = await this.getAuthClient();
            if (!authClient) {
              return 'Auth client not started';
            }

            if (!authClient.login) {
              return 'Auth client login function not found';
            }

            return authClient.login(email, password, true);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
          } catch (error: any) {
            return error.description || error.msg || error;
          }
        },
        [],
      );

      return <AuthenticationPage {...props} handleAuth={handleAuth} />;
    };
    WrappedAuthenticationPage.displayName = 'AuthenticationPage';
    return WrappedAuthenticationPage;
  }

  async logout() {
    const client = await this.getAuthClient();
    try {
      client?.logout();
    } catch (e) {
      console.error(e);
    }
  }
  getToken() {
    return this.tokenPromise!();
  }

  async entriesByFolder(folder: string, extension: string, depth: number) {
    return this.backend!.entriesByFolder(folder, extension, depth);
  }
  allEntriesByFolder(folder: string, extension: string, depth: number) {
    return this.backend!.allEntriesByFolder(folder, extension, depth);
  }
  entriesByFiles(files: ImplementationFile[]) {
    return this.backend!.entriesByFiles(files);
  }
  getEntry(path: string) {
    return this.backend!.getEntry(path);
  }

  async isLargeMediaFile(path: string) {
    const client = await this.getLargeMediaClient();
    return client.enabled && client.matchPath(path);
  }

  getMedia(mediaFolder = this.mediaFolder, folderSupport?: boolean) {
    return this.backend!.getMedia(mediaFolder, folderSupport);
  }

  // this method memoizes this._getLargeMediaClient so that there can
  // only be one client at a time
  getLargeMediaClient() {
    if (this._largeMediaClientPromise) {
      return this._largeMediaClientPromise;
    }
    this._largeMediaClientPromise = this._getLargeMediaClient();
    return this._largeMediaClientPromise;
  }
  _getLargeMediaClient() {
    const netlifyLargeMediaEnabledPromise = this.api!.readFile('.lfsconfig')
      .then(config => ini.decode<{ lfs: { url: string } }>(config as string))
      .then(({ lfs: { url } }) => new URL(url))
      .then(lfsURL => ({
        enabled: lfsURL.hostname.endsWith('netlify.com') || lfsURL.hostname.endsWith('netlify.app'),
      }))
      .catch((err: Error) => ({ enabled: false, err }));

    const lfsPatternsPromise = this.api!.readFile('.gitattributes')
      .then(attributes => getLargeMediaPatternsFromGitAttributesFile(attributes as string))
      .then((patterns: string[]) => ({ err: null, patterns }))
      .catch((err: Error) => {
        if (err.message.includes('404')) {
          console.info('[StaticCMS] This 404 was expected and handled appropriately.');
          return { err: null, patterns: [] as string[] };
        } else {
          return { err, patterns: [] as string[] };
        }
      });

    return Promise.all([netlifyLargeMediaEnabledPromise, lfsPatternsPromise]).then(
      ([{ enabled: maybeEnabled }, { patterns, err: patternsErr }]) => {
        const enabled = maybeEnabled && !patternsErr;

        // We expect LFS patterns to exist when the .lfsconfig states
        // that we're using Netlify Large Media
        if (maybeEnabled && patternsErr) {
          console.error(patternsErr);
        }

        return getClient({
          enabled,
          rootURL: this.netlifyLargeMediaURL,
          makeAuthorizedRequest: this.requestFunction,
          patterns,
          transformImages: this.transformImages ? { nf_resize: 'fit', w: 560, h: 320 } : false,
        });
      },
    );
  }
  async getLargeMediaDisplayURL(
    { path, id }: { path: string; id: string | null },
    branch = this.branch,
  ) {
    const readFile = (
      path: string,
      id: string | null | undefined,
      { parseText }: { parseText: boolean },
    ) => this.api!.readFile(path, id, { branch, parseText });

    const items = await entriesByFiles(
      [{ path, id }],
      readFile,
      this.api!.readFileMetadata.bind(this.api),
      'Git-Gateway',
    );
    const entry = items[0];
    const pointerFile = parsePointerFile(entry.data);
    if (!pointerFile.sha) {
      console.warn(`[StaticCMS] Failed parsing pointer file ${path}`);
      return { url: path, blob: new Blob() };
    }

    const client = await this.getLargeMediaClient();
    const { url, blob } = await client.getDownloadURL(pointerFile);
    return { url, blob };
  }

  async getMediaDisplayURL(displayURL: DisplayURL): Promise<string> {
    const { path, id } = displayURL as DisplayURLObject;
    const isLargeMedia = await this.isLargeMediaFile(path);
    if (isLargeMedia) {
      const { url } = await this.getLargeMediaDisplayURL({ path, id });
      return url;
    }
    if (typeof displayURL === 'string') {
      return displayURL;
    }

    return this.backend!.getMediaDisplayURL(displayURL);
  }

  async getMediaFile(path: string) {
    const isLargeMedia = await this.isLargeMediaFile(path);
    if (isLargeMedia) {
      const { url, blob } = await this.getLargeMediaDisplayURL({ path, id: null });
      const name = basename(path);
      return {
        id: url,
        name,
        path,
        url,
        displayURL: url,
        file: new File([blob], name),
        size: blob.size,
      };
    }
    return this.backend!.getMediaFile(path);
  }

  async persistEntry(entry: BackendEntry, options: PersistOptions) {
    const client = await this.getLargeMediaClient();
    if (client.enabled) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const assets = (await getLargeMediaFilteredMediaFiles(client, entry.assets)) as any;
      return this.backend!.persistEntry({ ...entry, assets }, options);
    } else {
      return this.backend!.persistEntry(entry, options);
    }
  }

  async persistMedia(mediaFile: AssetProxy, options: PersistOptions) {
    const { fileObj, path } = mediaFile;
    const displayURL = URL.createObjectURL(fileObj as Blob);
    const client = await this.getLargeMediaClient();
    const fixedPath = path.startsWith('/') ? path.slice(1) : path;
    const isLargeMedia = await this.isLargeMediaFile(fixedPath);
    if (isLargeMedia) {
      const persistMediaArgument = (await getPointerFileForMediaFileObj(
        client,
        fileObj as File,
        path,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )) as any;
      return {
        ...(await this.backend!.persistMedia(persistMediaArgument, options)),
        displayURL,
      };
    }
    return await this.backend!.persistMedia(mediaFile, options);
  }
  deleteFiles(paths: string[], commitMessage: string) {
    return this.backend!.deleteFiles(paths, commitMessage);
  }
  traverseCursor(cursor: Cursor, action: string) {
    return this.backend!.traverseCursor!(cursor, action);
  }
}
