/**
 * ImagingRequest model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var ImagingRequest = require('../../sqldb').ImagingRequest;
var ImagingRequestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ImagingRequestEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  ImagingRequest.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ImagingRequestEvents.emit(event + ':' + doc._id, doc);
    ImagingRequestEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ImagingRequestEvents;
