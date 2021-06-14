import { Response } from 'express';

export enum EResponseCodes {
  success = 200,
  badRequest = 400,
  internalServerError = 500
}

export function successResponse(message: string, data: any, res: Response) {
  res.status(EResponseCodes.success).json({
    status: 'SUCCESS',
    message,
    data
  });
}

export function failureResponse(message: string, data: any, res: Response) {
  res.status(EResponseCodes.success).json({
    status: 'FAILURE',
    message,
    data
  });
}

export function insufficientParameters(res: Response) {
  res.status(EResponseCodes.badRequest).json({
    status: 'FAILURE',
    message: 'Insufficient parameters',
    data: {}
  });
}
