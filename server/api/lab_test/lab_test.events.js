/**
 * LabTest model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var LabTest = require('../../sqldb').LabTest;
var LabTestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
LabTestEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  LabTest.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    LabTestEvents.emit(event + ':' + doc._id, doc);
    LabTestEvents.emit(event, doc);
    done(null);
  }
}

module.exports = LabTestEvents;
