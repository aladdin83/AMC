/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/expenses              ->  index
 * POST    /api/expenses              ->  create
 * GET     /api/expenses/:id          ->  show
 * PUT     /api/expenses/:id          ->  update
 * DELETE  /api/expenses/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var sqldb = require('../../sqldb');
var Expense = sqldb.Expense;

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

// Gets a list of Expenses
exports.index = function(req, res) {
  Expense.findAll()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Expense from the DB
exports.show = function(req, res) {
  Expense.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Expense in the DB
exports.create = function(req, res) {
  Expense.create(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Expense in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Expense.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Expense from the DB
exports.destroy = function(req, res) {
  Expense.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
