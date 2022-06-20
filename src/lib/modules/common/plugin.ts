import { FastifyInstance, FastifyRegisterOptions } from 'fastify';

import * as commonController from './controller';

import { DoneFn } from '../../shared/types';

export function commonPlugin(fastify: FastifyInstance, opts: FastifyRegisterOptions<unknown>, done: DoneFn): void {
  fastify.route({
    method: 'GET',
    url: '/all',
    handler: commonController.getCommonData,
    bodyLimit: 100,
  });

  done();
}
