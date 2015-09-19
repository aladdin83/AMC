/**
 * Bill model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Bill = require('../../sqldb').Bill;
var BillEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BillEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bill.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    BillEvents.emit(event + ':' + doc._id, doc);
    BillEvents.emit(event, doc);
    done(null);
  }
}

module.exports = BillEvents;
