/**
 * LabRequest model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var LabRequest = require('../../sqldb').LabRequest;
var LabRequestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LabRequestEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  LabRequest.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LabRequestEvents.emit(event + ':' + doc._id, doc);
    LabRequestEvents.emit(event, doc);
    done(null);
  }
}

module.exports = LabRequestEvents;
