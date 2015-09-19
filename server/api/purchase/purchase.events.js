/**
 * Purchase model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Purchase = require('../../sqldb').Purchase;
var PurchaseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
PurchaseEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Purchase.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    PurchaseEvents.emit(event + ':' + doc._id, doc);
    PurchaseEvents.emit(event, doc);
    done(null);
  }
}

module.exports = PurchaseEvents;
