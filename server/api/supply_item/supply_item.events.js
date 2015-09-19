/**
 * SupplyItem model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var SupplyItem = require('../../sqldb').SupplyItem;
var SupplyItemEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SupplyItemEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SupplyItem.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    SupplyItemEvents.emit(event + ':' + doc._id, doc);
    SupplyItemEvents.emit(event, doc);
    done(null);
  }
}

module.exports = SupplyItemEvents;
