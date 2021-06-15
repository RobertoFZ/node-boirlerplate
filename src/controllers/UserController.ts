import { Request, Response, Router } from 'express'
import express from 'express'
import {
	insufficientParameters,
	successResponse,
} from 'modules/common/service'
import { User } from 'models/User'
import { EUserRoles } from 'types/User'
import { validate } from 'class-validator'
import validateJWT from 'modules/common/validateJWT'
import validateRole from 'modules/common/validateRole'

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
		const users = await User.find()
		return successResponse('Users list', users, res)
	}

	async create(req: Request, res: Response): Promise<void> {
		const { firstName, lastName, email, password } = req.body

		const existingUser = await User.findOne(null, { where: { email } })
		if (existingUser) {
			return insufficientParameters(res, 'Email already taken', {
				email,
			})
		}

		const user = new User()
		user.firstName = firstName
		user.lastName = lastName
		user.password = password
		user.email = email
		user.role = EUserRoles.user

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
		await user.save()

		delete user.password
		return successResponse('User created successful', user, res)
	}
}

export default new UserController()
