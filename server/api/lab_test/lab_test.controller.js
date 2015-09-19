/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/lab_tests              ->  index
 * POST    /api/lab_tests              ->  create
 * GET     /api/lab_tests/:id          ->  show
 * PUT     /api/lab_tests/:id          ->  update
 * DELETE  /api/lab_tests/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var LabTest = sqldb.LabTest;

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

// Gets a list of LabTests
exports.index = function(req, res) {
  LabTest.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single LabTest from the DB
exports.show = function(req, res) {
  LabTest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new LabTest in the DB
exports.create = function(req, res) {
  LabTest.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing LabTest in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  LabTest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a LabTest from the DB
exports.destroy = function(req, res) {
  LabTest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
