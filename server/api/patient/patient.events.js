/**
 * Patient model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Patient = require('../../sqldb').Patient;
var PatientEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PatientEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Patient.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PatientEvents.emit(event + ':' + doc._id, doc);
    PatientEvents.emit(event, doc);
    done(null);
  }
}

module.exports = PatientEvents;
