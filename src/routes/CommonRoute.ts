import { Application, Request, Response } from 'express'

const CommonRoutes = (app: Application): void => {
	app.all(
		'*',
		(req: Request, res: Response): Response =>
			res
				.status(404)
				.send({ error: true, message: 'Check your URL please' }),
	)
}

export default CommonRoutes
