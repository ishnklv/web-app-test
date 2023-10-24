const express = require('express');

const { app: appConfig } = require('./configs');
const logger = require('./logger');
const database = require('./database');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

require('./routes/user.route')(app);

const PORT = appConfig.port;

const bootstrap = async () => {
  try {
    await database.sequelize.sync();

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    logger.error('Application running failed with error: ', e);
  }
}

bootstrap();
