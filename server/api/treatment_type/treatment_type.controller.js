/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/treatment_types              ->  index
 * POST    /api/treatment_types              ->  create
 * GET     /api/treatment_types/:id          ->  show
 * PUT     /api/treatment_types/:id          ->  update
 * DELETE  /api/treatment_types/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var TreatmentType = sqldb.TreatmentType;

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

// Gets a list of TreatmentTypes
exports.index = function(req, res) {
  TreatmentType.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single TreatmentType from the DB
exports.show = function(req, res) {
  TreatmentType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new TreatmentType in the DB
exports.create = function(req, res) {
  TreatmentType.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing TreatmentType in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  TreatmentType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a TreatmentType from the DB
exports.destroy = function(req, res) {
  TreatmentType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
