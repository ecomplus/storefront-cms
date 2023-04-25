import { WAIT_UNTIL_ACTION } from '../constants';

import type { AnyAction } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '../store';
import type { WaitActionArgs } from '../store/middleware/waitUntilAction';

export function waitUntil({ predicate, run }: WaitActionArgs) {
  return {
    type: WAIT_UNTIL_ACTION,
    predicate,
    run,
  };
}

export async function waitUntilWithTimeout<T>(
  dispatch: ThunkDispatch<RootState, {}, AnyAction>,
  waitActionArgs: (resolve: (value?: T) => void) => WaitActionArgs,
  timeout = 30000,
): Promise<T | null | undefined> {
  let waitDone = false;

  const waitPromise = new Promise<T | undefined>(resolve => {
    dispatch(waitUntil(waitActionArgs(resolve)));
  });

  const timeoutPromise = new Promise<T | null>(resolve => {
    setTimeout(() => {
      if (waitDone) {
        resolve(null);
      } else {
        console.warn('[StaticCMS] Wait Action timed out');
        resolve(null);
      }
    }, timeout);
  });

  const result = await Promise.race([
    waitPromise
      .then(result => {
        waitDone = true;
        return result;
      })
      .catch(null),
    timeoutPromise,
  ]);

  return result;
}
