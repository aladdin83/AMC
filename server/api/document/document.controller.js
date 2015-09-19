/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/documents              ->  index
 * POST    /api/documents              ->  create
 * GET     /api/documents/:id          ->  show
 * PUT     /api/documents/:id          ->  update
 * DELETE  /api/documents/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Document = sqldb.Document;

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

// Gets a list of Documents
exports.index = function(req, res) {
  Document.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Document from the DB
exports.show = function(req, res) {
  Document.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Document in the DB
exports.create = function(req, res) {
  Document.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Document in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Document.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Document from the DB
exports.destroy = function(req, res) {
  Document.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
