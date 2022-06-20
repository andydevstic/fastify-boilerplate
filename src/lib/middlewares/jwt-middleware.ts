import assert from 'assert';
import createHttpError from 'http-errors';
import { FastifyReply } from 'fastify';

import * as jwtUtils from '../shared/utils/jwt';

import { AppRequest } from '../shared/types';
import { AuthPayload } from '../modules/auth/types';
import { extractAuthToken } from '../shared/utils/request-utils';

export async function jwtMiddleware(req: AppRequest, res: FastifyReply): Promise<void> {
  try {
    const authToken = extractAuthToken(req);
    const { user } = jwtUtils.decode(authToken) as AuthPayload;

    assert.ok(user);

    req.user = user;
  } catch (error) {
    throw createHttpError(401, 'Unauthorized');
  }
}
