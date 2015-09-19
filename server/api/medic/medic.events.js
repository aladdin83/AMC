/**
 * Medic model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Medic = require('../../sqldb').Medic;
var MedicEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MedicEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Medic.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    MedicEvents.emit(event + ':' + doc._id, doc);
    MedicEvents.emit(event, doc);
    done(null);
  }
}

module.exports = MedicEvents;
