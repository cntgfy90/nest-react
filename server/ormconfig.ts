export = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USER,
  entitties: ['src/**/models/**/*.ts'],
  migrations: ['migrations/**/*.ts'],
  cli: {
    entitiesDir: 'models',
    migrationsDir: 'migrations',
  },
};
  