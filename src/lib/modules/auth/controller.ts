import { FastifyReply } from 'fastify';

import * as authService from './service';
import { AppRequest } from '../../shared/types';
import { LoginDTO, RegisterDTO } from './types';

export async function login(req: AppRequest, res: FastifyReply): Promise<void> {
  const loginDTO = req.body as LoginDTO;
  const authPayload = await authService.loginWithEmail(loginDTO.email, loginDTO.password);

  res.status(200).send({
    success: true,
    data: authPayload,
  });
}

export async function register(req: AppRequest, res: FastifyReply): Promise<void> {
  const registerDTO = req.body as RegisterDTO;

  await authService.register(registerDTO);

  res.status(200).send({
    success: true,
  });
}
