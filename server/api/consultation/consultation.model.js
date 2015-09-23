'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Consultation', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    medical_condition: DataTypes.TEXT,
    complaint: DataTypes.TEXT,
    access: {
      type: DataTypes.ENUM,
      values: ['private', 'public']
    }
  },{
    paranoid: true
  });
};
