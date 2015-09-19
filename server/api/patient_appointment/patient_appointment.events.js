/**
 * PatientAppointment model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var PatientAppointment = require('../../sqldb').PatientAppointment;
var PatientAppointmentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PatientAppointmentEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  PatientAppointment.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PatientAppointmentEvents.emit(event + ':' + doc._id, doc);
    PatientAppointmentEvents.emit(event, doc);
    done(null);
  }
}

module.exports = PatientAppointmentEvents;
