import { FastifyRequest } from 'fastify';

import { AuthenticatedUser } from '../modules/auth/types';

export interface AppRequest extends FastifyRequest {
  user?: AuthenticatedUser;
}

export interface HttpRequestOptions {
  method: string;
  body?: any;
  headers?: Record<string, string>;
}

export type DoneFn = (error?: any) => void;

export enum EntityStatus {
  INACTIVE,
  ACTIVE,
  DELETED,
}

export interface IMedia {
  type: string;
  name: string;
  url: string;
  format: string;
}

export type FilterOperator = '$eq' | '$lt' | '$lte' | '$gt' | '$gte' | '$in' | '$nin';

export interface IFilterCriteria {
  field: string;
  operator: FilterOperator;
  value: any;
}
