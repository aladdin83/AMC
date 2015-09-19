/**
 * Task model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Task = require('../../sqldb').Task;
var TaskEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TaskEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Task.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    TaskEvents.emit(event + ':' + doc._id, doc);
    TaskEvents.emit(event, doc);
    done(null);
  }
}

module.exports = TaskEvents;
