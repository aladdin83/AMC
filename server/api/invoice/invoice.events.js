/**
 * Invoice model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Invoice = require('../../sqldb').Invoice;
var InvoiceEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InvoiceEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Invoice.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    InvoiceEvents.emit(event + ':' + doc._id, doc);
    InvoiceEvents.emit(event, doc);
    done(null);
  }
}

module.exports = InvoiceEvents;
