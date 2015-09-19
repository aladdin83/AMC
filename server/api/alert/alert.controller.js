/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/alerts              ->  index
 * POST    /api/alerts              ->  create
 * GET     /api/alerts/:id          ->  show
 * PUT     /api/alerts/:id          ->  update
 * DELETE  /api/alerts/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Alert = sqldb.Alert;

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

// Gets a list of Alerts
exports.index = function(req, res) {
  Alert.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Alert from the DB
exports.show = function(req, res) {
  Alert.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Alert in the DB
exports.create = function(req, res) {
  Alert.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Alert in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Alert.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Alert from the DB
exports.destroy = function(req, res) {
  Alert.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
