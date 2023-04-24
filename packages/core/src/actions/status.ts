import { currentBackend } from '../backend';
import { STATUS_FAILURE, STATUS_REQUEST, STATUS_SUCCESS } from '../constants';
import { addSnackbar, removeSnackbarById } from '../store/slices/snackbars';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';

export function statusRequest() {
  return {
    type: STATUS_REQUEST,
  } as const;
}

export function statusSuccess(status: {
  auth: { status: boolean };
  api: { status: boolean; statusPage: string };
}) {
  return {
    type: STATUS_SUCCESS,
    payload: { status },
  } as const;
}

export function statusFailure(error: Error) {
  return {
    type: STATUS_FAILURE,
    payload: { error },
  } as const;
}

export function checkBackendStatus() {
  return async (dispatch: ThunkDispatch<RootState, {}, AnyAction>, getState: () => RootState) => {
    try {
      const state = getState();
      const config = state.config.config;
      if (state.status.isFetching || !config) {
        return;
      }

      dispatch(statusRequest());
      const backend = currentBackend(config);
      const status = await backend.status();

      const backendDownKey = 'ui.toast.onBackendDown';
      const previousBackendDownNotifs = state.snackbar.messages.filter(
        n => typeof n.message !== 'string' && n.message.key === backendDownKey,
      );

      if (status.api.status === false) {
        if (previousBackendDownNotifs.length === 0) {
          dispatch(
            addSnackbar({
              type: 'error',
              message: {
                key: 'ui.toast.onBackendDown',
                options: { details: status.api.statusPage },
              },
            }),
          );
        }
        return dispatch(statusSuccess(status));
      } else if (status.api.status === true && previousBackendDownNotifs.length > 0) {
        // If backend is up, clear all the danger messages
        previousBackendDownNotifs.forEach(notif => {
          dispatch(removeSnackbarById(notif.id));
        });
      }

      const authError = status.auth.status === false;
      if (authError) {
        const key = 'ui.toast.onLoggedOut';
        const existingNotification = state.snackbar.messages.find(
          n => typeof n.message !== 'string' && n.message.key === key,
        );
        if (!existingNotification) {
          dispatch(
            addSnackbar({
              type: 'error',
              message: { key: 'ui.toast.onLoggedOut' },
            }),
          );
        }
      }

      dispatch(statusSuccess(status));
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        dispatch(statusFailure(error));
      }
    }
  };
}

export type StatusAction = ReturnType<
  typeof statusRequest | typeof statusSuccess | typeof statusFailure
>;
