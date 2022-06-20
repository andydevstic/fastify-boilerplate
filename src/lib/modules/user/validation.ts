import { EntityStatus } from '../../shared/types';
import { generateValidationFieldsPicker } from '../../shared/utils/object';
import { UserType } from './types';

const userValidationFields = {
  email: {
    type: 'string',
    format: 'email',
    minLength: 3,
    maxLength: 100,
  },
  password: {
    type: 'string',
    format: 'password',
    minLength: 6,
    maxLength: 60,
  },
  username: {
    type: 'string',
    pattern: '^[a-zA-z0-9]+$',
    minLength: 6,
    maxLength: 20,
  },
  phoneNumber: {
    type: 'string',
    pattern: '^[0-9]+$',
    minLength: 6,
    maxLength: 12,
  },
  address: {
    type: 'string',
    minLength: 3,
    maxLength: 255,
  },
  type: {
    type: 'number',
    enum: Object.values(UserType),
  },
  status: {
    type: 'number',
    enum: Object.values(EntityStatus),
  },
};

export const pickUserValidationFields = generateValidationFieldsPicker(userValidationFields);
