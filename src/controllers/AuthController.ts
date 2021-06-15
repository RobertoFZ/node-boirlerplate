import { Request, Response, Router } from 'express'
import express from 'express'
import jwt from 'jsonwebtoken'
import { validate } from 'class-validator'
import { classToPlain } from 'class-transformer'
import {
	insufficientParameters,
	notContentResponse,
	successResponse,
	unauthorizedResponse,
} from 'modules/common/service'
import { User } from 'models/User'
import environment from 'environment'

class AuthController {
	private router: Router
	public name = 'auth'

	constructor() {
		this.router = express.Router()
	}

	routes(): Router {
		this.router.post('/login', this.login)
		this.router.post('/change-password', this.changePassword)
		return this.router
	}

	async login(req: Request, res: Response): Promise<void> {
		//Check if username and password are set
		const { email, password } = req.body
		if (!(email && password)) {
			return insufficientParameters(
				res,
				'Email and password are required fields',
			)
		}
		//Get user from database
		let user: User
		try {
			user = await User.findOneOrFail(null, {
				where: { email },
			})
		} catch (error) {
			return unauthorizedResponse(res, 'Wrong email or password', {
				email,
				password,
			})
		}

		//Check if encrypted password match
		if (!user.checkIfUnencryptedPasswordIsValid(password)) {
			return unauthorizedResponse(res, 'Wrong email or password', {
				email,
				password,
			})
		}

		//Sing JWT, valid for 1 hour
		delete user.password
		const token = jwt.sign(classToPlain(user), environment.jwt.secret, {
			expiresIn: environment.jwt.expireTime,
		})

		//Send the jwt in the response
		return successResponse(
			'Logged in successful',
			{
				token,
			},
			res,
		)
	}

	async changePassword(req: Request, res: Response): Promise<void> {
		//Get ID from JWT
		const id = res.locals.jwtPayload.userId

		//Get parameters from the body
		const { oldPassword, newPassword } = req.body
		if (!(oldPassword && newPassword)) {
			return insufficientParameters(
				res,
				'The old password and the new password are required',
			)
		}

		//Get user from the database
		let user: User
		try {
			user = await User.findOneOrFail(id)
		} catch (id) {
			return unauthorizedResponse(res, 'User not found')
		}

		//Check if old password matchs
		if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
			return unauthorizedResponse(res, 'Old password does not match')
		}

		//Validate de model (password lenght)
		user.password = newPassword
		const errors = await validate(user)
		if (errors.length > 0) {
			res.status(400).send(errors)
			return insufficientParameters(res, 'Validation error', errors)
		}

		//Hash the new password and save
		user.hashPassword()
		user.save()

		return notContentResponse(res)
	}
}

export default new AuthController()
