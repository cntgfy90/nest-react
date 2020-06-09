export default () => ({
  serverPort: process.env.SERVER_PORT || 3000,
  swaggerRoot: process.env.SWAGGER_ROOT || 'api',
});
