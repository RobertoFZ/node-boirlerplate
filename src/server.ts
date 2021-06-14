require('dotenv').config()

import { Application } from 'express'
import app from './config/app'
import environment from './environment'

const PORT = environment.port

app.init().then((application: Application) => {
	application.listen(PORT, () => {
		console.log('Express server listening on port ' + PORT)
	})
})
