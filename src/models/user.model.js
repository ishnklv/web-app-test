const { DataTypes} = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('user', {
    balance: {
      type: DataTypes.DECIMAL(10, 2),
    },
  });

  return User;
}
