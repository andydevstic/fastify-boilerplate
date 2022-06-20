import * as bcrypt from 'bcrypt';

import { saltRounds } from '../../../../config';

export const hash = async (data: string): Promise<string> => {
  return bcrypt.hash(data, saltRounds);
};

export const compareHash = (rawData: string, hashedData: string): Promise<boolean> => {
  return bcrypt.compare(rawData, hashedData);
};
