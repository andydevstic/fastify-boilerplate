import * as dotenv from 'dotenv';
dotenv.config();

import * as config from '../../config';
import { app } from '../lib/server/http';

process.on('SIGINT', () => app.close());
process.on('SIGTERM', () => app.close());

app.listen({ port: config.server.port, host: '0.0.0.0' }, (error) => {
  if (error) {
    app.log.error(error);

    process.exit(1);
  }
});
