'use strict';

module.exports = function(sequelize, DataTypes) {
  var Bill = sequelize.define('Bill', {
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
  
  Bill.belongsTo(sequelize.models.Account);
  return Bill;
};
