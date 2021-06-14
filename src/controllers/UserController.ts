import { Request, Response, Router } from 'express'
import express from 'express'
import { successResponse } from 'modules/common/service'
import { User } from 'models/User'

class UserController {
	private router: Router
	public name = 'user'

	constructor() {
		this.router = express.Router()
	}

	routes(): Router {
		this.router.get('/', this.find)
		this.router.post('/', this.create)
		return this.router
	}
	async find(req: Request, res: Response): Promise<void> {
		const users = await User.find()
		return successResponse('Users list', users, res)
	}
	async create(req: Request, res: Response): Promise<void> {
		const user = new User()
		user.firstName = 'Timber'
		user.lastName = 'Saw'
		await user.save()

		return successResponse('User created successful', user, res)
	}
}

export default new UserController()
