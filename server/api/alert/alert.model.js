'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Alert', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    message: DataTypes.TEXT,
    icon: DataTypes.STRING,
    read: DataTypes.BOOLEAN
  });
};
