import 'reflect-metadata'
import { createConnection } from 'typeorm'
import entities from 'models'
import environment from 'environment'

const { database } = environment

const connection = createConnection({
	...database,
	entities,
	synchronize: false,
})

export default connection
