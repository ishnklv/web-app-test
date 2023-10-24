const { config } = require('dotenv');
const { join } = require('path');

config({
  path: join(process.cwd(), '.env'),
});

module.exports = {
  app: {
    mode: process.env.APP_MODE || 'development',
    port: +process.env.APP_PORT || 3000,
  },
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: +process.env.DATABASE_PORT || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'root1234',
    name: process.env.DATABASE_NAME || 'web_app',
  }
}
