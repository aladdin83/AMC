/**
 * Diagnosis model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Diagnosis = require('../../sqldb').Diagnosis;
var DiagnosisEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DiagnosisEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Diagnosis.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DiagnosisEvents.emit(event + ':' + doc._id, doc);
    DiagnosisEvents.emit(event, doc);
    done(null);
  }
}

module.exports = DiagnosisEvents;
