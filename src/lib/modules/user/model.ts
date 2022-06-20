import mongoose, { Schema } from 'mongoose';

import { IUser } from './types';

export const UserSchema = new Schema({
  username: {
    type: String,
    index: true,
  },
  email: {
    type: String,
    index: true,
  },
  password: String,
  phoneNumber: String,
  address: String,
  type: mongoose.SchemaTypes.ObjectId,
  status: Number,
});

export const UserModel = mongoose.model<IUser>('User', UserSchema, 'users');
