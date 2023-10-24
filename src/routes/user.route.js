const router = require('express').Router();

module.exports = (app) => {
  const controller = require('../controllers/user.controller');

  router.put('/change-balance', controller.changeBalance);

  app.use('/api/users', router);
};
