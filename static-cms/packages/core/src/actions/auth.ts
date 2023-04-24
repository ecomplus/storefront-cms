import { currentBackend } from '../backend';
import { AUTH_FAILURE, AUTH_REQUEST, AUTH_REQUEST_DONE, AUTH_SUCCESS, LOGOUT } from '../constants';
import { addSnackbar } from '../store/slices/snackbars';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { Credentials, User } from '../interface';
import type { RootState } from '../store';

export function authenticating() {
  return {
    type: AUTH_REQUEST,
  } as const;
}

export function authenticate(userData: User) {
  return {
    type: AUTH_SUCCESS,
    payload: userData,
  } as const;
}

export function authError(error: Error) {
  return {
    type: AUTH_FAILURE,
    error: 'Failed to authenticate',
    payload: error,
  } as const;
}

export function doneAuthenticating() {
  return {
    type: AUTH_REQUEST_DONE,
  } as const;
}

export function logout() {
  return {
    type: LOGOUT,
  } as const;
}

// Check if user data token is cached and is valid
export function authenticateUser() {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);

    dispatch(authenticating());
    return Promise.resolve(backend.currentUser())
      .then(user => {
        if (user) {
          dispatch(authenticate(user));
        } else {
          dispatch(doneAuthenticating());
        }
      })
      .catch((error: unknown) => {
        console.error(error);
        if (error instanceof Error) {
          dispatch(authError(error));
        }
        dispatch(logoutUser());
      });
  };
}

export function loginUser(credentials: Credentials) {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);

    dispatch(authenticating());
    return backend
      .authenticate(credentials)
      .then(user => {
        dispatch(authenticate(user));
      })
      .catch((error: unknown) => {
        console.error(error);
        if (error instanceof Error) {
          dispatch(
            addSnackbar({
              type: 'warning',
              message: {
                key: 'ui.toast.onFailToAuth',
                options: {
                  details: error.message,
                },
              },
            }),
          );
          dispatch(authError(error));
        }
      });
  };
}

export function logoutUser() {
  return (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    const state = getState();
    if (!state.config.config) {
      return;
    }

    const backend = currentBackend(state.config.config);
    Promise.resolve(backend.logout()).then(() => {
      dispatch(logout());
    });
  };
}

export type AuthAction = ReturnType<
  | typeof authenticating
  | typeof authenticate
  | typeof authError
  | typeof doneAuthenticating
  | typeof logout
>;
