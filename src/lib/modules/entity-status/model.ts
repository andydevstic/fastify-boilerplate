import mongoose, { Schema } from 'mongoose';
import { IEntityStatus } from './types';

export const EntityStatusSchema = new Schema({
  name: String,
});

export const EntityStatusModel = mongoose.model<IEntityStatus>('EntityStatus', EntityStatusSchema, 'entity_statuses');
