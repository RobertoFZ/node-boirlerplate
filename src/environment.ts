const environment = {
  env: process.env.NODE_END || 'development',
  port: process.env.PORT || 8000,
  database: {
    name: process.env.DB_NAME || 'test',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
  }
}

export default environment;
