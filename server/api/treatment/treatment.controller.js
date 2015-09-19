/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/treatments              ->  index
 * POST    /api/treatments              ->  create
 * GET     /api/treatments/:id          ->  show
 * PUT     /api/treatments/:id          ->  update
 * DELETE  /api/treatments/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Treatment = sqldb.Treatment;

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

// Gets a list of Treatments
exports.index = function(req, res) {
  Treatment.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Treatment from the DB
exports.show = function(req, res) {
  Treatment.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Treatment in the DB
exports.create = function(req, res) {
  Treatment.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Treatment in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Treatment.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Treatment from the DB
exports.destroy = function(req, res) {
  Treatment.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
