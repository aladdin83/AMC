/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function(data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/vital_reading/vital_reading.socket').register(socket);
  require('../api/facility/facility.socket').register(socket);
  require('../api/appointment/appointment.socket').register(socket);
  require('../api/transaction/transaction.socket').register(socket);
  require('../api/expense/expense.socket').register(socket);
  require('../api/account/account.socket').register(socket);
  require('../api/memo/memo.socket').register(socket);
  require('../api/vendor/vendor.socket').register(socket);
  require('../api/purchase/purchase.socket').register(socket);
  require('../api/invoice/invoice.socket').register(socket);
  require('../api/supply_item/supply_item.socket').register(socket);
  require('../api/alert/alert.socket').register(socket);
  require('../api/note/note.socket').register(socket);
  require('../api/message/message.socket').register(socket);
  require('../api/country/country.socket').register(socket);
  require('../api/treatment_type/treatment_type.socket').register(socket);
  require('../api/lab_test/lab_test.socket').register(socket);
  require('../api/imaging_test/imaging_test.socket').register(socket);
  require('../api/prescription_entry/prescription_entry.socket').register(socket);
  require('../api/drug/drug.socket').register(socket);
  require('../api/patient_appointment/patient_appointment.socket').register(socket);
  require('../api/bill/bill.socket').register(socket);
  require('../api/contact/contact.socket').register(socket);
  require('../api/employee/employee.socket').register(socket);
  require('../api/prescription/prescription.socket').register(socket);
  require('../api/treatment/treatment.socket').register(socket);
  require('../api/diagnosis/diagnosis.socket').register(socket);
  require('../api/imaging_request/imaging_request.socket').register(socket);
  require('../api/lab_request/lab_request.socket').register(socket);
  require('../api/consultation/consultation.socket').register(socket);
  require('../api/document/document.socket').register(socket);
  require('../api/task/task.socket').register(socket);
  require('../api/medic/medic.socket').register(socket);
  require('../api/patient/patient.socket').register(socket);
  require('../api/department/department.socket').register(socket);
}

module.exports = function(socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function(socket) {
    socket.address = socket.request.connection.remoteAddress +
      ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function() {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};
