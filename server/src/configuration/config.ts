export default (): Record<string, unknown> => ({
  serverPort: process.env.SERVER_PORT || 3000,
  swaggerRoot: process.env.SWAGGER_ROOT || 'api',
  db: {
    type: 'postgres',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  },
});
