import { Request, Response, Router } from 'express'
import express from 'express'
import {
	failureResponse,
	insufficientParameters,
	successResponse,
} from 'modules/common/service'
import { User } from 'models/User'
import { EUserRoles } from 'types/User'
import { validate } from 'class-validator'
import validateJWT from 'modules/common/validateJWT'
import validateRole from 'modules/common/validateRole'
import { getRepository } from 'typeorm'

class UserController {
	private router: Router
	public name = 'user'

	constructor() {
		this.router = express.Router()
	}

	routes(): Router {
		this.router.get(
			'/',
			[validateJWT, validateRole([EUserRoles.admin])],
			this.find,
		)
		this.router.post('/', this.create)
		return this.router
	}

	async find(req: Request, res: Response): Promise<void> {
		try {
			const userRepository = getRepository(User)
			const users = await userRepository.find()
			return successResponse('Users list', users, res)
		} catch (error) {
			return failureResponse(
				'Error while trying to create the user',
				error,
				res,
			)
		}
	}

	async create(req: Request, res: Response): Promise<void> {
		const { firstName, lastName, email, password } = req.body

		try {
			const existingUser = await User.findOne(null, { where: { email } })
			if (existingUser) {
				return insufficientParameters(res, 'Email already taken', {
					email,
				})
			}

			const userRepository = getRepository(User)
			let user: User = userRepository.create({
				firstName,
				lastName,
				password,
				email,
			})

			//Validade if the parameters are ok
			const errors = await validate(user)
			if (errors.length > 0) {
				return insufficientParameters(res, 'Validation error', errors)
			}
			try {
				user.hashPassword()
			} catch (error) {
				return insufficientParameters(
					res,
					'Error while hashing your password',
				)
			}
			user = await userRepository.save(user)

			delete user.password
			return successResponse('User created successful', user, res)
		} catch (error) {
			return failureResponse(
				'Error while trying to create the user',
				error,
				res,
			)
		}
	}
}

export default new UserController()
