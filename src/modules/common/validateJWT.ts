import { classToPlain } from 'class-transformer'
import dayjs from 'dayjs'
import environment from 'environment'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from 'models/User'
import { ToBeDefined } from 'types/ToBeDefined'
import { EResponseCodes, unauthorizedResponse } from './service'

const validateJWT = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	//Get the jwt token from the head
	const token = <string>req.headers['auth']
	let jwtPayload

	//Try to validate the token and get data
	try {
		jwtPayload = <ToBeDefined>jwt.verify(token, environment.jwt.secret)
		res.locals.jwtPayload = jwtPayload
	} catch (error) {
		//If token is not valid, respond with 401 (unauthorized)
		return unauthorizedResponse(res)
	}

	//The token is valid for 1 hour
	//We want to send a new token on every request
	const { email, exp } = jwtPayload
	let user: User

	let expireTime = dayjs.unix(exp)

	if (dayjs().isAfter(expireTime)) {
		return unauthorizedResponse(res)
	}

	try {
		user = await User.findOneOrFail({ where: { email } })
	} catch (error) {
		return unauthorizedResponse(res)
	}
	delete user.password
	const newToken = jwt.sign(classToPlain(user), environment.jwt.secret, {
		expiresIn: environment.jwt.expireTime,
	})
	res.setHeader('token', newToken)

	//Call the next middleware or controller
	next()
}

export default validateJWT
