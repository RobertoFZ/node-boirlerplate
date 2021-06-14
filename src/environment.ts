export enum ENodeEnv {
	development = 'development',
	staging = 'staging',
	production = 'production',
}

interface IEnvironment {
	env: string
	port: number
	database: {
		host: string
		type: any
		database: string
		username: string
		password: string
		port: number
		logging: boolean
	}
}

const environment: IEnvironment = {
	env: process.env.NODE_END || ENodeEnv.development,
	port: Number(process.env.PORT) || 8000,
	database: {
		host: process.env.DB_HOST || 'localhost',
		type: process.env.DB_TYPE || 'postgres',
		database: process.env.DB_NAME || 'test',
		username: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || '',
		port: Number(process.env.DB_PORT) || 5432,
		logging: Boolean(process.env.DB_LOGGING) || true,
	},
}

export default environment
