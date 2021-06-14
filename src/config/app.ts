import express, { Application } from 'express'
import * as bodyParser from 'body-parser'
import 'reflect-metadata'
import CommonRoutes from 'routes/CommonRoute'
import apiV1 from 'routes/v1'
import connection from './database'

class App {
	public app: express.Application

	public async init(): Promise<void | Application> {
		return connection
			.then(() => {
				this.app = express()
				this.config()
				this.app.use('/api/v1', apiV1())
				CommonRoutes(this.app)
				return this.app
			})
			.catch((error) => console.log(error))
	}

	private config(): void {
		// support application/json type post data
		this.app.use(bodyParser.json())
		// support application/x-www-form-urlencoded post data
		this.app.use(bodyParser.urlencoded({ extended: false }))
	}
}

export default new App()
