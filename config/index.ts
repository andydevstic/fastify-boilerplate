import { MongoClientOptions } from 'mongodb';

const { PORT, DATABASE_URL, JWT_SECRET, SALT_ROUNDS, REDIS_HOST, REDIS_PORT } = process.env;

export const server = {
  port: Number(PORT) || 3000,
};

export const redis = {
  host: REDIS_HOST || 'localhost',
  port: Number(REDIS_PORT) || 6379,
};

export const saltRounds = Number(SALT_ROUNDS) || 10;

export const jwtConfig = {
  secret:
    JWT_SECRET ||
    '1319dd351f3afa8f68bc875e05580c3b1ec1aab0f4d448a51a9a3ebf73c18dceb6913db4294fd6bb6c0c6b5d2abfc960dc0a9c17d70d0875e9942c843ee3dcb38cf5ab50842fa5e33cb36415c6edd51cae77d604fa03db652be653458721e120360173b01dd6a4b65b5a711b701f2a9f973f566d7d3e422970e1c4f0a814a596',
};

export const mongo = {
  url: DATABASE_URL || 'mongodb://root:root@localhost:6379/pet_rescue',
  options: <MongoClientOptions>{
    connectTimeoutMS: 3000,
    maxPoolSize: 10,
  },
};
