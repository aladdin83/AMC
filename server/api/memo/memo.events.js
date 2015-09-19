/**
 * Memo model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Memo = require('../../sqldb').Memo;
var MemoEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MemoEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Memo.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    MemoEvents.emit(event + ':' + doc._id, doc);
    MemoEvents.emit(event, doc);
    done(null);
  }
}

module.exports = MemoEvents;
