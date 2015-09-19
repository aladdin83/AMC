/**
 * ImagingTest model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ImagingTest = require('../../sqldb').ImagingTest;
var ImagingTestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ImagingTestEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ImagingTest.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ImagingTestEvents.emit(event + ':' + doc._id, doc);
    ImagingTestEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ImagingTestEvents;
