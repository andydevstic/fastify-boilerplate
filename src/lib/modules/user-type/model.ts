import mongoose, { Schema } from 'mongoose';

import { IUserType } from './types';

export const UserTypeSchema = new Schema({
  name: String,
});

export const UserTypeModel = mongoose.model<IUserType>('UserType', UserTypeSchema, 'user_types');
