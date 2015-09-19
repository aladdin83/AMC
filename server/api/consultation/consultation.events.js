/**
 * Consultation model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Consultation = require('../../sqldb').Consultation;
var ConsultationEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ConsultationEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Consultation.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ConsultationEvents.emit(event + ':' + doc._id, doc);
    ConsultationEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ConsultationEvents;
