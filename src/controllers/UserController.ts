import { Request, Response, Router } from 'express'
import express from 'express'
import { successResponse } from 'modules/common/service'

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
		return successResponse('Users list', [{ name: 'Test' }], res)
	}
	async create(req: Request, res: Response): Promise<void> {
		return successResponse(
			'User created successful',
			{ name: 'Test' },
			res,
		)
	}
}

export default new UserController()
