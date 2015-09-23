'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Diagnosis', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    tite: DataTypes.BOOLEAN,
    diagnosis_type: {
      type: DataTypes.ENUM,
      values: ['differenial', 'final']
    },
    diagnosis_date: DataTypes.DATE,
    details: DataTypes.TEXT
  });
};
