/**
 * Facility model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Facility = require('../../sqldb').Facility;
var FacilityEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FacilityEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Facility.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    FacilityEvents.emit(event + ':' + doc._id, doc);
    FacilityEvents.emit(event, doc);
    done(null);
  }
}

module.exports = FacilityEvents;
