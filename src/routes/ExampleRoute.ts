import { Application, Request, Response } from 'express'

const ExampleRoute = (app: Application): void => {
	app.get(
		'/api/test',
		(req: Request, res: Response): Response =>
			res.status(200).json({ message: 'Get request successfull' }),
	)
	app.post(
		'/api/test',
		(req: Request, res: Response): Response =>
			res.status(200).json({ message: 'Post request successfull' }),
	)
}

export default ExampleRoute
