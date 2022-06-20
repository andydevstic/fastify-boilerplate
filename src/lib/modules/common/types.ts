import { IEntityStatus } from '../entity-status/types';
import { IUserType } from '../user-type/types';

export interface AppCommonData {
  userTypes: IUserType[];
  entityStatuses: IEntityStatus[];
}
