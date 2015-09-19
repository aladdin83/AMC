/**
 * Employee model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Employee = require('../../sqldb').Employee;
var EmployeeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
EmployeeEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Employee.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    EmployeeEvents.emit(event + ':' + doc._id, doc);
    EmployeeEvents.emit(event, doc);
    done(null);
  }
}

module.exports = EmployeeEvents;
