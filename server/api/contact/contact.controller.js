/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/contacts              ->  index
 * POST    /api/contacts              ->  create
 * GET     /api/contacts/:id          ->  show
 * PUT     /api/contacts/:id          ->  update
 * DELETE  /api/contacts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Contact = sqldb.Contact;

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
      .then(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Contacts
exports.index = function(req, res) {
  Contact.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Contact from the DB
exports.show = function(req, res) {
  Contact.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Contact in the DB
exports.create = function(req, res) {
  Contact.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Contact in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Contact.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Contact from the DB
exports.destroy = function(req, res) {
  Contact.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
