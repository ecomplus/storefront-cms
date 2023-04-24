import { produce } from 'immer';

import { AUTH_FAILURE, AUTH_REQUEST, AUTH_REQUEST_DONE, AUTH_SUCCESS, LOGOUT } from '../constants';

import type { AuthAction } from '../actions/auth';
import type { User } from '../interface';

export type AuthState = {
  isFetching: boolean;
  user: User | undefined;
  error: string | undefined;
};

export const defaultState: AuthState = {
  isFetching: false,
  user: undefined,
  error: undefined,
};

const auth = produce((state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case AUTH_REQUEST:
      state.isFetching = true;
      break;
    case AUTH_SUCCESS:
      state.user = action.payload;
      break;
    case AUTH_FAILURE:
      state.error = action.payload && action.payload.toString();
      break;
    case AUTH_REQUEST_DONE:
      state.isFetching = false;
      break;
    case LOGOUT:
      state.user = undefined;
      state.isFetching = false;
  }
}, defaultState);

export default auth;
