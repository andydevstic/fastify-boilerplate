import { FastifyInstance, FastifyRegisterOptions } from 'fastify';
import { DoneFn } from '../../shared/types';
import { pickUserValidationFields } from '../user/validation';

import * as authController from './controller';

export function authPlugin(fastify: FastifyInstance, opts: FastifyRegisterOptions<unknown>, done: DoneFn): void {
  fastify.route({
    method: 'POST',
    url: '/login',
    handler: authController.login,
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        additionalProperties: false,
        properties: pickUserValidationFields(['email', 'password']),
      },
    },
  });

  fastify.route({
    method: 'POST',
    url: '/register',
    handler: authController.register,
    schema: {
      body: {
        type: 'object',
        required: ['email', 'username'],
        additionalProperties: false,
        properties: pickUserValidationFields(),
      },
    },
  });

  done();
}
