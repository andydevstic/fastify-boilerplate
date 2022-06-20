import createError, { HttpError } from 'http-errors';
import helmet from '@fastify/helmet';
import fastify, { FastifyReply, FastifyError } from 'fastify';
import fastifyCors from '@fastify/cors';

import mongoose from 'mongoose';

import { AppRequest } from '../shared/types';
import { authPlugin } from '../modules/auth/plugin';
import { mongo } from '../../../config';
import { redisInstance } from '../db/redis';

export const app = fastify({
  logger: true,
  ajv: {
    plugins: [require('ajv-formats')],
  },
});

app.addHook('onReady', async () => {
  try {
    await mongoose.connect(mongo.url, mongo.options);
    app.log.info('Database connected successfully');

    await redisInstance.connect();
    app.log.info('Redis connected successfully');
  } catch (error) {
    app.log.error(error);
    process.exit(1);
  }
});

app.addHook('onClose', async () => {
  await mongoose.connection.close();
});

app.register(helmet, {
  global: true,
  contentSecurityPolicy: false,
});
app.register(fastifyCors, { credentials: true, origin: true });

app.setErrorHandler((error: FastifyError | HttpError, req: AppRequest, res: FastifyReply) => {
  req.log.error(error.stack);

  if (createError.isHttpError(error)) {
    res.status(error.status).send({ message: error.message });
  } else if (error.validation) {
    res.status(400).send({ message: 'Bad Request', details: error.validation });
  } else {
    res.status(500).send({ message: 'Internal Server Error' });
  }
});

app.register(authPlugin, { prefix: 'auth' });

app.get('/livez', (req: AppRequest, res: FastifyReply) => {
  res.status(200).send('OK');
});
