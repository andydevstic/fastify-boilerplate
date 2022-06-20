import jwt from 'jsonwebtoken';

import * as config from '../../../../config';

export function decode(token: string) {
  return jwt.verify(token, config.jwtConfig.secret);
}

export function encode(payload: any): string {
  return jwt.sign(payload, config.jwtConfig.secret);
}
