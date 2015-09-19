/**
 * Treatment model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Treatment = require('../../sqldb').Treatment;
var TreatmentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TreatmentEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Treatment.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TreatmentEvents.emit(event + ':' + doc._id, doc);
    TreatmentEvents.emit(event, doc);
    done(null);
  }
}

module.exports = TreatmentEvents;
