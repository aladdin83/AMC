/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/appointments', require('./api/appointment'));
  app.use('/api/transactions', require('./api/transaction'));
  app.use('/api/expenses', require('./api/expense'));
  app.use('/api/accounts', require('./api/account'));
  app.use('/api/memos', require('./api/memo'));
  app.use('/api/vendors', require('./api/vendor'));
  app.use('/api/purchases', require('./api/purchase'));
  app.use('/api/invoices', require('./api/invoice'));
  app.use('/api/supply_items', require('./api/supply_item'));
  app.use('/api/alerts', require('./api/alert'));
  app.use('/api/notes', require('./api/note'));
  app.use('/api/messages', require('./api/message'));
  app.use('/api/countries', require('./api/country'));
  app.use('/api/treatment_types', require('./api/treatment_type'));
  app.use('/api/lab_tests', require('./api/lab_test'));
  app.use('/api/imaging_tests', require('./api/imaging_test'));
  app.use('/api/prescription_entries', require('./api/prescription_entry'));
  app.use('/api/drugs', require('./api/drug'));
  app.use('/api/patient_appointments', require('./api/patient_appointment'));
  app.use('/api/bills', require('./api/bill'));
  app.use('/api/contacts', require('./api/contact'));
  app.use('/api/employees', require('./api/employee'));
  app.use('/api/prescriptions', require('./api/prescription'));
  app.use('/api/treatments', require('./api/treatment'));
  app.use('/api/diagnosiss', require('./api/diagnosis'));
  app.use('/api/imaging_requests', require('./api/imaging_request'));
  app.use('/api/lab_requests', require('./api/lab_request'));
  app.use('/api/consultations', require('./api/consultation'));
  app.use('/api/documents', require('./api/document'));
  app.use('/api/tasks', require('./api/task'));
  app.use('/api/medics', require('./api/medic'));
  app.use('/api/patients', require('./api/patient'));
  app.use('/api/departments', require('./api/department'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
