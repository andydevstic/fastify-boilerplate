import { AppCommonData } from './types';

import { EntityStatusModel } from '../entity-status/model';
import { UserTypeModel } from '../user-type/model';

export async function getAllCommonData(): Promise<AppCommonData> {
  const [userTypes, entityStatuses] = await Promise.all([UserTypeModel.find(), EntityStatusModel.find()]);

  return {
    userTypes,
    entityStatuses,
  };
}
