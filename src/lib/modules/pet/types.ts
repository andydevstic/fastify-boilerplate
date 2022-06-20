import { IMedia } from '../../shared/types';

export interface IPet {
  name: string;
  specie: number;
  breed: number;
  age: number;
  category: PetCategory;
  media: IMedia[];
}

export interface ILostPet extends IPet {
  lostLocation: string;
  foundLocation: string;
  rewardAmount: number;
  currency: string;
}

export interface IOrphanPet extends IPet {
  adoptPrice: number;
  currency: string;
  location: string;
}

export enum PetCategory {
  LOST = 'lost',
  Orphan = 'orphan',
}
