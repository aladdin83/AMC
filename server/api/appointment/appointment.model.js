'use strict';

module.exports = function(sequelize, DataTypes) {
  var Appointment = sequelize.define('Appointment', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    info: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    appointmentDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ['pending','confirmed','canceled','rescheduled','done','arrived','under process']
    },
    durations: {
      type: DataTypes.INTEGER,
      isInt: true,
      comment: 'Duration in Minutes'
    },
    access: {
      type: DataTypes.ENUM,
      values: ['private', 'public'],
      comment: 'if Private it will only be visible to the Creator, Department, and Medic specified'
    },
    complaint: DataTypes.TEXT,
    appointment_type: {
      type: DataTypes.ENUM,
      values: ['Follow-Up Visit', 'New Patient Visit','Nursing Only', 'Urgent Visit', 'Wellness Exam']
    }
  },{
    paranoid: true
  });
  return Appointment;
};
