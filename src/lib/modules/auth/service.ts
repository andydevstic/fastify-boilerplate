import assert from 'assert';
import createHttpError from 'http-errors';
import { EntityStatus } from '../../shared/types';

import * as bcryptUtils from '../../shared/utils/bcrypt';
import * as jwtUtils from '../../shared/utils/jwt';

import { UserModel } from '../user/model';
import { UserType } from '../user/types';
import { MsgUnauthorized } from './messages';
import { AuthenticatedUser, AuthPayload, RegisterDTO } from './types';

export async function loginWithEmail(email: string, password: string): Promise<AuthPayload> {
  const foundUser = await UserModel.findOne({ email });
  assert.ok(foundUser, createHttpError(401, MsgUnauthorized()));

  const isPasswordValid = await bcryptUtils.compareHash(password, foundUser.password);
  assert.equal(isPasswordValid, true, createHttpError(401, MsgUnauthorized()));

  const userAuthPayload: AuthenticatedUser = {
    email: foundUser.email,
    username: foundUser.username,
    address: foundUser.address,
    phoneNumber: foundUser.phoneNumber,
    status: foundUser.status,
  };

  const jwtToken = jwtUtils.encode(userAuthPayload);

  return {
    token: jwtToken,
    user: userAuthPayload,
  };
}

export async function register(dto: RegisterDTO): Promise<void> {
  const hashedPassword = await bcryptUtils.hash(dto.password);
  const _ = await UserModel.create({
    ...dto,
    password: hashedPassword,
    type: UserType.Common,
    status: EntityStatus.INACTIVE,
  });

  return;
}
