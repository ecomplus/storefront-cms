/* eslint-disable @typescript-eslint/no-explicit-any */
// Based on wait-service by Mozilla:
// https://github.com/mozilla/gecko-dev/blob/main/devtools/client/shared/redux/middleware/wait-service.js

/**
 * A middleware that provides the ability for actions to install a
 * function to be run once when a specific condition is met by an
 * action coming through the system. Think of it as a thunk that
 * blocks until the condition is met.
 */
import { WAIT_UNTIL_ACTION } from '@staticcms/core/constants';

import type { AnyAction, Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit';

export interface WaitActionArgs {
  predicate: (action: AnyAction) => boolean;
  run: (dispatch: Dispatch, getState: () => any, action: AnyAction) => void;
}

interface WaitAction extends WaitActionArgs {
  type: typeof WAIT_UNTIL_ACTION;
}

// eslint-disable-next-line func-style
export const waitUntilAction: Middleware<{}, any, Dispatch> = ({
  dispatch,
  getState,
}: MiddlewareAPI<Dispatch, any>) => {
  let pending: WaitAction[] = [];

  function checkPending(action: AnyAction): void {
    const readyRequests = [];
    const stillPending = [];

    // Find the pending requests whose predicates are satisfied with
    // this action. Wait to run the requests until after we update the
    // pending queue because the request handler may synchronously
    // dispatch again and run this service (that use case is
    // completely valid).
    for (const request of pending) {
      if (request.predicate(action)) {
        readyRequests.push(request);
      } else {
        stillPending.push(request);
      }
    }

    pending = stillPending;
    for (const request of readyRequests) {
      request.run(dispatch, getState, action);
    }
  }

  return (next: Dispatch<AnyAction>) =>
    (action: AnyAction | undefined): null | AnyAction => {
      if (!action) {
        return null;
      }
      if (action?.type === WAIT_UNTIL_ACTION) {
        pending.push(action as WaitAction);
        return null;
      }
      const result = next(action);
      checkPending(action);
      return result;
    };
};
