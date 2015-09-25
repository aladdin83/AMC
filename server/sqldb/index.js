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
db.VitalReading = db.sequelize.import('../api/vital_reading/vital_reading.model');
db.Facility = db.sequelize.import('../api/facility/facility.model');
db.Appointment = db.sequelize.import('../api/appointment/appointment.model');
db.Transaction = db.sequelize.import('../api/transaction/transaction.model');
db.Expense = db.sequelize.import('../api/expense/expense.model');
db.Account = db.sequelize.import('../api/account/account.model');
db.Memo = db.sequelize.import('../api/memo/memo.model');
db.Vendor = db.sequelize.import('../api/vendor/vendor.model');
db.Purchase = db.sequelize.import('../api/purchase/purchase.model');
db.Invoice = db.sequelize.import('../api/invoice/invoice.model');
db.SupplyItem = db.sequelize.import('../api/supply_item/supply_item.model');
db.Alert = db.sequelize.import('../api/alert/alert.model');
db.Note = db.sequelize.import('../api/note/note.model');
db.Message = db.sequelize.import('../api/message/message.model');
db.Country = db.sequelize.import('../api/country/country.model');
db.TreatmentType = db.sequelize.import('../api/treatment_type/treatment_type.model');
db.LabTest = db.sequelize.import('../api/lab_test/lab_test.model');
db.ImagingTest = db.sequelize.import('../api/imaging_test/imaging_test.model');
db.PrescriptionEntry = db.sequelize.import('../api/prescription_entry/prescription_entry.model');
db.Drug = db.sequelize.import('../api/drug/drug.model');
db.PatientAppointment = db.sequelize.import('../api/patient_appointment/patient_appointment.model');
db.Bill = db.sequelize.import('../api/bill/bill.model');
db.Contact = db.sequelize.import('../api/contact/contact.model');
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

//Setting up Relations

// APPOINTMENT
db.Appointment.belongsTo(db.Patient);
db.Appointment.belongsTo(db.Medic);
db.Appointment.belongsTo(db.Facility);
db.Appointment.belongsTo(db.User, {as: 'CreatedBy'})

// CONSULTATION
db.Consultation.belongsTo(db.Medic);
db.Consultation.belongsTo(db.Patient);
db.Consultation.belongsTo(db.User, {as: 'CreatedBy'});

// MEDIC
db.Medic.belongsTo(db.User);
db.Medic.belongsTo(db.Department);
db.Medic.belongsTo(db.User, {as: 'CreatedBy'});


// Diagnosis
db.Diagnosis.belongsTo(db.Medic);
db.Diagnosis.belongsTo(db.Consultation);
db.Diagnosis.belongsTo(db.User, {as: 'CreatedBy'});

module.exports = db;
