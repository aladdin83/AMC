/**
 * Sequelize initialization module
 */

'use strict';

var path = require('path');
var config = require('../config/environment');

var Sequelize = require('sequelize');

var db = {
  Sequelize: Sequelize,
  sequelize: new Sequelize(config.sequelize.uri, config.sequelize.options)
};

// Insert models below
db.Employee = db.sequelize.import('../api/employee/employee.model');
db.Prescription = db.sequelize.import('../api/prescription/prescription.model');
db.Treatment = db.sequelize.import('../api/treatment/treatment.model');
db.Diagnosis = db.sequelize.import('../api/diagnosis/diagnosis.model');
db.ImagingRequest = db.sequelize.import('../api/imaging_request/imaging_request.model');
db.LabRequest = db.sequelize.import('../api/lab_request/lab_request.model');
db.Consultation = db.sequelize.import('../api/consultation/consultation.model');
db.Document = db.sequelize.import('../api/document/document.model');
db.Task = db.sequelize.import('../api/task/task.model');
db.Medic = db.sequelize.import('../api/medic/medic.model');
db.Patient = db.sequelize.import('../api/patient/patient.model');
db.Department = db.sequelize.import('../api/department/department.model');
db.User = db.sequelize.import('../api/user/user.model');
db.Thing = db.sequelize.import('../api/thing/thing.model');


module.exports = db;
