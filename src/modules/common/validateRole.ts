import { Request, Response, NextFunction } from 'express'
import { User } from 'models/User'
import { getRepository } from 'typeorm'
import { EResponseCodes, unauthorizedResponse } from './service'

const validateRole = (roles: Array<string>) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		//Get the user ID from previous midleware
		const id = res.locals.jwtPayload.userId

		//Get user role from the database
		const userRepository = getRepository(User)
		let user: User
		try {
			user = await userRepository.findOneOrFail(id)
		} catch (id) {
			return unauthorizedResponse(res)
		}

		//Check if array of authorized roles includes the user's role
		if (roles.indexOf(user.role) > -1) next()
		else return unauthorizedResponse(res)
	}
}

export default validateRole
