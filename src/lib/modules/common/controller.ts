import { FastifyReply } from 'fastify';

import * as commonService from './service';
import { AppRequest } from '../../shared/types';

export async function getCommonData(req: AppRequest, res: FastifyReply): Promise<void> {
  const commonData = await commonService.getAllCommonData();

  res.status(200).send({
    success: true,
    data: commonData,
  });
}
