import { EntityStatus } from '../../shared/types';

export interface IUser {
  username: string;
  email: string;
  password: string;
  phoneNumber?: string;
  address?: string;
  type: UserType;
  status: EntityStatus;
}

export enum UserType {
  Common = 1,
  Moderator,
  Admin,
}
