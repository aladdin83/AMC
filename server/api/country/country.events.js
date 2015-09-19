/**
 * Country model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Country = require('../../sqldb').Country;
var CountryEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CountryEvents.setMaxListeners(0);

// Model events
var events = {
  'afterCreate': 'save',
  'afterUpdate': 'save',
  'afterDestroy': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Country.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    CountryEvents.emit(event + ':' + doc._id, doc);
    CountryEvents.emit(event, doc);
    done(null);
  }
}

module.exports = CountryEvents;
