'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('VitalReading', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    height: {
      type: DataTypes.DECIMAL,
      comment: 'cm'
      },
    weight: {
      type: DataTypes.DECIMAL,
      comment: 'kg'
      },
    blood_pressure_systolic: {
      type: DataTypes.INTEGER,
      comment: 'mmHg'
      },
    blood_pressure_diastolic: {
      type: DataTypes.INTEGER,
      comment: 'mmHg'
    },
    temperature: {
      type: DataTypes.DECIMAL,
      comment: 'celsius'
    },
    pulse: {
      type: DataTypes.INTEGER,
      comment: 'bpm'
    },
    respiratory_rate: {
      type: DataTypes.INTEGER,
      comment: 'bpm'
    },
    o2_saturation: {
      type: DataTypes.INTEGER,
      comment: '%'
    },
    head_circumference: {
      type: DataTypes.DECIMAL,
      comment: 'cm'
    }
    
     
  });
};
