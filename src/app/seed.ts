import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

import { UserTypeModel } from '../lib/modules/user-type/model';
import { UserType } from '../lib/modules/user/types';
import { EntityStatus } from '../lib/shared/types';
import { EntityStatusModel } from '../lib/modules/entity-status/model';
import { mongo } from '../../config';

async function seedUserTypes(): Promise<void> {
  await UserTypeModel.deleteMany({});
  await UserTypeModel.insertMany([
    {
      name: UserType.Common,
    },
    {
      name: UserType.Moderator,
    },
    {
      name: UserType.Admin,
    },
  ]);
}

async function seedEntityStatuses(): Promise<void> {
  await EntityStatusModel.deleteMany({});
  await EntityStatusModel.insertMany([
    {
      name: EntityStatus.INACTIVE,
    },
    {
      name: EntityStatus.ACTIVE,
    },
    {
      name: EntityStatus.DELETED,
    },
  ]);
}

async function seed() {
  await mongoose.connect(mongo.url);
  await seedEntityStatuses();
  await seedUserTypes();
}

seed()
  .then(() => {
    console.log('seed completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
