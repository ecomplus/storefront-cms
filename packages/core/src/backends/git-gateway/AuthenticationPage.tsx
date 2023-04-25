import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Login from '@staticcms/core/components/login/Login';

import type { AuthenticationPageProps, TranslatedProps, User } from '@staticcms/core/interface';

function useNetlifyIdentifyEvent(eventName: 'login', callback: (login: User) => void): void;
function useNetlifyIdentifyEvent(eventName: 'logout', callback: () => void): void;
function useNetlifyIdentifyEvent(eventName: 'error', callback: (err: Error) => void): void;
function useNetlifyIdentifyEvent(
  eventName: 'login' | 'logout' | 'error',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callback: (input?: any) => void,
): void {
  useEffect(() => {
    window.netlifyIdentity?.on(eventName, callback);
  }, [callback, eventName]);
}

export interface GitGatewayAuthenticationPageProps
  extends TranslatedProps<AuthenticationPageProps> {
  handleAuth: (email: string, password: string) => Promise<User | string>;
}

const GitGatewayAuthenticationPage = ({ onLogin, t }: GitGatewayAuthenticationPageProps) => {
  const [loggingIn, setLoggingIn] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errors, setErrors] = useState<{
    identity?: string;
    server?: string;
    email?: string;
    password?: string;
  }>({});

  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (window.netlifyIdentity) {
      let initialized = false;
      Promise.race([
        new Promise<void>(resolve => {
          window.netlifyIdentity?.on('init', () => {
            if (!initialized) {
              initialized = true;
              resolve();
            }
          });
        }),
        new Promise<void>(resolve => {
          const interval = setInterval(() => {
            if (initialized) {
              clearInterval(interval);
              return;
            }

            if (window.netlifyIdentity) {
              console.info('[StaticCMS] Manually initializing identity widget');
              initialized = true;
              window.netlifyIdentity.init();
              clearInterval(interval);
              resolve();
            }
          }, 250);
        }),
      ]).then(() => {
        setInitialized(true);
      });
    }
  }, []);

  useEffect(() => {
    if (!loggedIn && window.netlifyIdentity && window.netlifyIdentity.currentUser()) {
      setLoggingIn(true);
      setTimeout(() => {
        if (!window.netlifyIdentity) {
          setLoggingIn(false);
          return;
        }
        onLogin(window.netlifyIdentity.currentUser());
        setLoggedIn(true);
        window.netlifyIdentity.close();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIdentityLogin = useCallback(
    (user: User) => {
      setLoggingIn(true);
      setTimeout(() => {
        onLogin(user);
        setLoggedIn(true);
        window.netlifyIdentity?.close();
      });
    },
    [onLogin],
  );

  useNetlifyIdentifyEvent('login', handleIdentityLogin);

  const handleIdentityLogout = useCallback(() => {
    window.netlifyIdentity?.open();
  }, []);

  useNetlifyIdentifyEvent('logout', handleIdentityLogout);

  const handleIdentityError = useCallback(
    (err: Error) => {
      if (err?.message?.match(/^Failed to load settings from.+\.netlify\/identity$/)) {
        window.netlifyIdentity?.close();
        setErrors({ identity: t('auth.errors.identitySettings') });
      }
    },
    [t],
  );

  useNetlifyIdentifyEvent('error', handleIdentityError);

  const handleIdentity = useCallback(() => {
    const user = window.netlifyIdentity?.currentUser();
    if (user) {
      setLoggingIn(true);
      setTimeout(() => {
        onLogin(user);
        setLoggedIn(true);
      });
    } else {
      window.netlifyIdentity?.open();
    }
  }, [onLogin]);

  const errorContent = useMemo(() => {
    if (!window.netlifyIdentity) {
      return t('auth.errors.netlifyIdentityNotFound');
    }

    if (errors.identity) {
      return (
        <a
          href="https://docs.netlify.com/visitor-access/git-gateway/#setup-and-settings"
          target="_blank"
          rel="noopener noreferrer"
        >
          {errors.identity}
        </a>
      );
    }

    return null;
  }, [errors.identity, t]);

  return (
    <Login
      login={handleIdentity}
      label={t('auth.loginWithNetlifyIdentity')}
      inProgress={loggingIn}
      error={errorContent}
      disabled={!initialized}
    />
  );
};

export default GitGatewayAuthenticationPage;
