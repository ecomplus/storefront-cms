import { v4 as uuid } from 'uuid';

export function createNonce() {
  const nonce = uuid();
  window.sessionStorage.setItem('static-cms-auth', JSON.stringify({ nonce }));
  return nonce;
}

export function validateNonce(check: string) {
  const auth = window.sessionStorage.getItem('static-cms-auth');
  const valid = auth && (JSON.parse(auth).nonce as string);
  window.localStorage.removeItem('static-cms-auth');
  return check === valid;
}

export function isInsecureProtocol() {
  return (
    document.location.protocol !== 'https:' &&
    // TODO: Is insecure localhost a bad idea as well? I don't think it is, since you are not actually
    //       sending the token over the internet in this case, assuming the auth URL is secure.
    document.location.hostname !== 'localhost' &&
    document.location.hostname !== '127.0.0.1'
  );
}
