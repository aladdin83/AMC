/**
 * Expense model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Expense = require('../../sqldb').Expense;
var ExpenseEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ExpenseEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Expense.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ExpenseEvents.emit(event + ':' + doc._id, doc);
    ExpenseEvents.emit(event, doc);
    done(null);
  }
}

module.exports = ExpenseEvents;
