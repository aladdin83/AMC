/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/facilities              ->  index
 * POST    /api/facilities              ->  create
 * GET     /api/facilities/:id          ->  show
 * PUT     /api/facilities/:id          ->  update
 * DELETE  /api/facilities/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Facility = sqldb.Facility;

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

// Gets a list of Facilitys
exports.index = function(req, res) {
  Facility.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Facility from the DB
exports.show = function(req, res) {
  Facility.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Facility in the DB
exports.create = function(req, res) {
  Facility.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Facility in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Facility.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Facility from the DB
exports.destroy = function(req, res) {
  Facility.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
