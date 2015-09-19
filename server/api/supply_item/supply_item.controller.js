/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/supply_items              ->  index
 * POST    /api/supply_items              ->  create
 * GET     /api/supply_items/:id          ->  show
 * PUT     /api/supply_items/:id          ->  update
 * DELETE  /api/supply_items/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var SupplyItem = sqldb.SupplyItem;

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

// Gets a list of SupplyItems
exports.index = function(req, res) {
  SupplyItem.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single SupplyItem from the DB
exports.show = function(req, res) {
  SupplyItem.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new SupplyItem in the DB
exports.create = function(req, res) {
  SupplyItem.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing SupplyItem in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  SupplyItem.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a SupplyItem from the DB
exports.destroy = function(req, res) {
  SupplyItem.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
