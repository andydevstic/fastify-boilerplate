import assert from 'assert';

import { AppRequest } from '../types';

export function extractAuthToken(req: AppRequest) {
  const { authorization } = req.headers;
  assert.ok(authorization);

  const [_userScheme, token] = authorization.split(' ');

  assert.ok(token);

  return token;
}
