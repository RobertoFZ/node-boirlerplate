import express from 'express'
import * as bodyParser from 'body-parser'
import CommonRoutes from 'routes/CommonRoute'
import apiV1 from 'routes/v1'

class App {
	public app: express.Application

	constructor() {
		this.app = express()
		this.config()
		this.app.use('/api/v1', apiV1())
		CommonRoutes(this.app)
	}

	private config(): void {
		// support application/json type post data
		this.app.use(bodyParser.json())
		// support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }))
	}
}

export default new App().app
