import sortBy from 'lodash/sortBy';
import unionBy from 'lodash/unionBy';
import semaphore from 'semaphore';

import { basename } from './path';

import type { Semaphore } from 'semaphore';
import type {
  DisplayURL,
  DisplayURLObject,
  FileMetadata,
  ImplementationEntry,
  ImplementationFile,
} from '@staticcms/core/interface';
import type { AsyncLock } from './asyncLock';

const MAX_CONCURRENT_DOWNLOADS = 10;

type ReadFile = (
  path: string,
  id: string | null | undefined,
  options: { parseText: boolean },
) => Promise<string | Blob>;

type ReadFileMetadata = (path: string, id: string | null | undefined) => Promise<FileMetadata>;

type CustomFetchFunc = (files: ImplementationFile[]) => Promise<ImplementationEntry[]>;

async function fetchFiles(
  files: ImplementationFile[],
  readFile: ReadFile,
  readFileMetadata: ReadFileMetadata,
  apiName: string,
) {
  const sem = semaphore(MAX_CONCURRENT_DOWNLOADS);
  const promises = [] as Promise<ImplementationEntry | { error: boolean }>[];
  files.forEach(file => {
    promises.push(
      new Promise(resolve =>
        sem.take(async () => {
          try {
            const [data, fileMetadata] = await Promise.all([
              readFile(file.path, file.id, { parseText: true }),
              readFileMetadata(file.path, file.id),
            ]);
            resolve({ file: { ...file, ...fileMetadata }, data: data as string });
            sem.leave();
          } catch (error) {
            sem.leave();
            console.error(`failed to load file from ${apiName}: ${file.path}`);
            resolve({ error: true });
          }
        }),
      ),
    );
  });
  return Promise.all(promises).then(loadedEntries =>
    loadedEntries.filter(loadedEntry => !(loadedEntry as { error: boolean }).error),
  ) as Promise<ImplementationEntry[]>;
}

export async function entriesByFolder(
  listFiles: () => Promise<ImplementationFile[]>,
  readFile: ReadFile,
  readFileMetadata: ReadFileMetadata,
  apiName: string,
) {
  const files = await listFiles();
  return fetchFiles(files, readFile, readFileMetadata, apiName);
}

export async function entriesByFiles(
  files: ImplementationFile[],
  readFile: ReadFile,
  readFileMetadata: ReadFileMetadata,
  apiName: string,
) {
  return fetchFiles(files, readFile, readFileMetadata, apiName);
}

export function blobToFileObj(name: string, blob: Blob) {
  const options = name.match(/.svg$/) ? { type: 'image/svg+xml' } : {};
  return new File([blob], name, options);
}

export async function getMediaAsBlob(path: string, id: string | null, readFile: ReadFile) {
  let blob: Blob;
  if (path.match(/.svg$/)) {
    const text = (await readFile(path, id, { parseText: true })) as string;
    blob = new Blob([text], { type: 'image/svg+xml' });
  } else {
    blob = (await readFile(path, id, { parseText: false })) as Blob;
  }
  return blob;
}

export async function getMediaDisplayURL(
  displayURL: DisplayURL,
  readFile: ReadFile,
  semaphore: Semaphore,
) {
  const { path, id } = displayURL as DisplayURLObject;
  return new Promise<string>((resolve, reject) =>
    semaphore.take(() =>
      getMediaAsBlob(path, id, readFile)
        .then(blob => URL.createObjectURL(blob))
        .then(resolve, reject)
        .finally(() => semaphore.leave()),
    ),
  );
}

export async function runWithLock(lock: AsyncLock, func: Function, message: string) {
  try {
    const acquired = await lock.acquire();
    if (!acquired) {
      console.warn('[StaticCMS]', message);
    }

    const result = await func();
    return result;
  } finally {
    lock.release();
  }
}

const LOCAL_KEY = 'git.local';

type LocalTree = {
  head: string;
  files: { id: string; name: string; path: string }[];
};

type GetKeyArgs = {
  branch: string;
  folder: string;
  extension: string;
  depth: number;
};

function getLocalKey({ branch, folder, extension, depth }: GetKeyArgs) {
  return `${LOCAL_KEY}.${branch}.${folder}.${extension}.${depth}`;
}

type PersistLocalTreeArgs = GetKeyArgs & {
  localForage: LocalForage;
  localTree: LocalTree;
};

type GetLocalTreeArgs = GetKeyArgs & {
  localForage: LocalForage;
};

export async function persistLocalTree({
  localForage,
  localTree,
  branch,
  folder,
  extension,
  depth,
}: PersistLocalTreeArgs) {
  await localForage.setItem<LocalTree>(
    getLocalKey({ branch, folder, extension, depth }),
    localTree,
  );
}

export async function getLocalTree({
  localForage,
  branch,
  folder,
  extension,
  depth,
}: GetLocalTreeArgs) {
  const localTree = await localForage.getItem<LocalTree>(
    getLocalKey({ branch, folder, extension, depth }),
  );
  return localTree;
}

type GetDiffFromLocalTreeMethods = {
  getDifferences: (
    to: string,
    from: string,
  ) => Promise<
    {
      oldPath: string;
      newPath: string;
      status: string;
    }[]
  >;
  filterFile: (file: { path: string; name: string }) => boolean;
  getFileId: (path: string) => Promise<string>;
};

type GetDiffFromLocalTreeArgs = GetDiffFromLocalTreeMethods & {
  branch: { name: string; sha: string };
  localTree: LocalTree;
  folder: string;
  extension: string;
  depth: number;
};

async function getDiffFromLocalTree({
  branch,
  localTree,
  folder,
  getDifferences,
  filterFile,
  getFileId,
}: GetDiffFromLocalTreeArgs) {
  const diff = await getDifferences(branch.sha, localTree.head);
  const diffFiles = diff
    .filter(d => d.oldPath?.startsWith(folder) || d.newPath?.startsWith(folder))
    .reduce((acc, d) => {
      if (d.status === 'renamed') {
        acc.push({
          path: d.oldPath,
          name: basename(d.oldPath),
          deleted: true,
        });
        acc.push({
          path: d.newPath,
          name: basename(d.newPath),
          deleted: false,
        });
      } else if (d.status === 'deleted') {
        acc.push({
          path: d.oldPath,
          name: basename(d.oldPath),
          deleted: true,
        });
      } else {
        acc.push({
          path: d.newPath || d.oldPath,
          name: basename(d.newPath || d.oldPath),
          deleted: false,
        });
      }

      return acc;
    }, [] as { path: string; name: string; deleted: boolean }[])

    .filter(filterFile);

  const diffFilesWithIds = await Promise.all(
    diffFiles.map(async file => {
      if (!file.deleted) {
        const id = await getFileId(file.path);
        return { ...file, id };
      } else {
        return { ...file, id: '' };
      }
    }),
  );

  return diffFilesWithIds;
}

type AllEntriesByFolderArgs = GetKeyArgs &
  GetDiffFromLocalTreeMethods & {
    listAllFiles: (
      folder: string,
      extension: string,
      depth: number,
    ) => Promise<ImplementationFile[]>;
    readFile: ReadFile;
    readFileMetadata: ReadFileMetadata;
    getDefaultBranch: () => Promise<{ name: string; sha: string }>;
    isShaExistsInBranch: (branch: string, sha: string) => Promise<boolean>;
    apiName: string;
    localForage: LocalForage;
    customFetch?: CustomFetchFunc;
  };

export async function allEntriesByFolder({
  listAllFiles,
  readFile,
  readFileMetadata,
  apiName,
  branch,
  localForage,
  folder,
  extension,
  depth,
  getDefaultBranch,
  isShaExistsInBranch,
  getDifferences,
  getFileId,
  filterFile,
  customFetch,
}: AllEntriesByFolderArgs) {
  async function listAllFilesAndPersist() {
    const files = await listAllFiles(folder, extension, depth);
    const branch = await getDefaultBranch();
    await persistLocalTree({
      localForage,
      localTree: {
        head: branch.sha,
        files: files.map(f => ({ id: f.id!, path: f.path, name: basename(f.path) })),
      },
      branch: branch.name,
      depth,
      extension,
      folder,
    });
    return files;
  }

  async function listFiles() {
    const localTree = await getLocalTree({ localForage, branch, folder, extension, depth });
    if (localTree) {
      const branch = await getDefaultBranch();
      // if the branch was forced pushed the local tree sha can be removed from the remote tree
      const localTreeInBranch = await isShaExistsInBranch(branch.name, localTree.head);
      if (!localTreeInBranch) {
        console.info(
          `[StaticCMS] Can't find local tree head '${localTree.head}' in branch '${branch.name}', rebuilding local tree`,
        );
        return listAllFilesAndPersist();
      }
      const diff = await getDiffFromLocalTree({
        branch,
        localTree,
        folder,
        extension,
        depth,
        getDifferences,
        getFileId,
        filterFile,
      }).catch(e => {
        console.info('[StaticCMS] Failed getting diff from local tree:', e);
        return null;
      });

      if (!diff) {
        console.info(`[StaticCMS] Diff is null, rebuilding local tree`);
        return listAllFilesAndPersist();
      }

      if (diff.length === 0) {
        // return local copy
        return localTree.files;
      } else {
        const deleted = diff.reduce((acc, d) => {
          acc[d.path] = d.deleted;
          return acc;
        }, {} as Record<string, boolean>);
        const newCopy = sortBy(
          unionBy(
            diff.filter(d => !deleted[d.path]),
            localTree.files.filter(f => !deleted[f.path]),
            file => file.path,
          ),
          file => file.path,
        );

        await persistLocalTree({
          localForage,
          localTree: { head: branch.sha, files: newCopy },
          branch: branch.name,
          depth,
          extension,
          folder,
        });

        return newCopy;
      }
    } else {
      return listAllFilesAndPersist();
    }
  }

  const files = await listFiles();
  if (customFetch) {
    return await customFetch(files);
  }
  return await fetchFiles(files, readFile, readFileMetadata, apiName);
}
