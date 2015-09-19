/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/imaging_requests              ->  index
 * POST    /api/imaging_requests              ->  create
 * GET     /api/imaging_requests/:id          ->  show
 * PUT     /api/imaging_requests/:id          ->  update
 * DELETE  /api/imaging_requests/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var ImagingRequest = sqldb.ImagingRequest;

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

// Gets a list of ImagingRequests
exports.index = function(req, res) {
  ImagingRequest.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single ImagingRequest from the DB
exports.show = function(req, res) {
  ImagingRequest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new ImagingRequest in the DB
exports.create = function(req, res) {
  ImagingRequest.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing ImagingRequest in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  ImagingRequest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a ImagingRequest from the DB
exports.destroy = function(req, res) {
  ImagingRequest.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
