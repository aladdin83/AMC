/**
 * Prescription model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Prescription = require('../../sqldb').Prescription;
var PrescriptionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PrescriptionEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Prescription.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PrescriptionEvents.emit(event + ':' + doc._id, doc);
    PrescriptionEvents.emit(event, doc);
    done(null);
  }
}

module.exports = PrescriptionEvents;
