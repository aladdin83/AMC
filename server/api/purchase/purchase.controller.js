/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/purchases              ->  index
 * POST    /api/purchases              ->  create
 * GET     /api/purchases/:id          ->  show
 * PUT     /api/purchases/:id          ->  update
 * DELETE  /api/purchases/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Purchase = sqldb.Purchase;

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

// Gets a list of Purchases
exports.index = function(req, res) {
  Purchase.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Purchase from the DB
exports.show = function(req, res) {
  Purchase.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Purchase in the DB
exports.create = function(req, res) {
  Purchase.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Purchase in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Purchase.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Purchase from the DB
exports.destroy = function(req, res) {
  Purchase.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
