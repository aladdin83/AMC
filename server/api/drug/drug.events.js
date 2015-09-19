/**
 * Drug model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Drug = require('../../sqldb').Drug;
var DrugEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DrugEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Drug.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    DrugEvents.emit(event + ':' + doc._id, doc);
    DrugEvents.emit(event, doc);
    done(null);
  }
}

module.exports = DrugEvents;
