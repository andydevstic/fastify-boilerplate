import { Schema } from 'mongoose';

export const MediaSchema = new Schema({
  type: String,
  name: String,
  url: String,
  format: String,
});
