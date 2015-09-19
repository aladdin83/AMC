/**
 * Alert model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Alert = require('../../sqldb').Alert;
var AlertEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AlertEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Alert.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AlertEvents.emit(event + ':' + doc._id, doc);
    AlertEvents.emit(event, doc);
    done(null);
  }
}

module.exports = AlertEvents;
