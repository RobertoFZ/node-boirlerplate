import AuthController from 'controllers/AuthController'
import UserController from 'controllers/UserController'
import { Router } from 'express'

const apiV1 = (): Router => {
	const router = Router()
	router.use(`/${UserController.name}`, UserController.routes())
	router.use(`/${AuthController.name}`, AuthController.routes())
	return router
}

export default apiV1
