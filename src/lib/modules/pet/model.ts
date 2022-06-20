import mongoose, { model, Schema } from 'mongoose';
import { MediaSchema } from '../../shared/schemas';
import { ILostPet, IOrphanPet } from './types';

const PetSchema = new Schema({
  name: String,
  specie: Number,
  breed: Number,
  age: Number,
  media: [MediaSchema],
});

const PetModel = model('Pet', PetSchema, 'pets');

const LostPetSchema = new Schema({
  lostLocation: {
    type: 'string',
    index: true,
  },
  foundLocation: {
    type: 'string',
    index: true,
  },
  rewardAmount: {
    type: 'number',
    index: true,
  },
  currency: {
    type: 'string',
    default: 'VND',
  },
});

export const LostPetModel = PetModel.discriminator<ILostPet>('LostPet', LostPetSchema);

const OrphanPetSchema = new Schema({
  adoptPrice: {
    type: 'number',
    index: true,
  },
  currency: {
    type: 'string',
    default: 'VND',
  },
  location: {
    type: 'string',
    index: true,
  },
});

export const OrphanPetModel = PetModel.discriminator<IOrphanPet>('OrphanPet', OrphanPetSchema);
