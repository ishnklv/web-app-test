const { Sequelize } = require('sequelize');
const { database } = require('./configs');
const User = require('./models/user.model');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: database.host,
  port: database.port,
  username: database.username,
  password: database.password,
  database: database.name,
});

const db = {
  models: {
    User: User(sequelize),
  }
};

db.sequelize = sequelize;

module.exports = db;
