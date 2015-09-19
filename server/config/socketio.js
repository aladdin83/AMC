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
  require('../api/thing/thing.socket').register(socket);
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
