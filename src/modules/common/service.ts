import { Response } from 'express';

export enum EResponseCodes {
  success = 200,
  badRequest = 400,
  internalServerError = 500
}

export function successResponse(message: string, DATA: any, res: Response) {
  res.status(EResponseCodes.success).json({
    STATUS: 'SUCCESS',
    MESSAGE: message,
    DATA
  });
}

export function failureResponse(message: string, DATA: any, res: Response) {
  res.status(EResponseCodes.success).json({
    STATUS: 'FAILURE',
    MESSAGE: message,
    DATA
  });
}

export function insufficientParameters(res: Response) {
  res.status(EResponseCodes.badRequest).json({
    STATUS: 'FAILURE',
    MESSAGE: 'Insufficient parameters',
    DATA: {}
  });
}

export function mongoError(err: any, res: Response) {
  res.status(EResponseCodes.internalServerError).json({
    STATUS: 'FAILURE',
    MESSAGE: 'MongoDB error',
    DATA: err
  });
}