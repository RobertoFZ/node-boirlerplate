import { Response } from 'express'
import { ToBeDefined } from 'types/ToBeDefined'

export enum EResponseCodes {
	success = 200,
	notContent = 204,
	badRequest = 400,
	unauthorized = 401,
	internalServerError = 500,
}

export function successResponse(
	message: string,
	data: any,
	res: Response,
) {
	res.status(EResponseCodes.success).json({
		status: 'Success',
		message,
		data,
	})
}

export function notContentResponse(
	res: Response,
	message: string = 'Not content',
) {
	res.status(EResponseCodes.notContent).json({
		status: 'Success',
		message,
	})
}

export function failureResponse(
	message: string,
	data: any,
	res: Response,
) {
	res.status(EResponseCodes.success).json({
		status: 'Failure',
		message,
		data,
	})
}

export function insufficientParameters(
	res: Response,
	message: string = 'Bad request',
	data: ToBeDefined = {},
) {
	res.status(EResponseCodes.badRequest).json({
		status: 'Failure',
		message,
		data,
	})
}

export function unauthorizedResponse(
	res: Response,
	message: string = "You don't have permissions",
	data: ToBeDefined = {},
) {
	res.status(EResponseCodes.unauthorized).json({
		status: 'Unautorized',
		message,
		data,
	})
}
