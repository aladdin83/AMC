'use strict';

module.exports = function(sequelize, DataTypes) {
  var Account = sequelize.define('Account', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  });
  return Account;
};
