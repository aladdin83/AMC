'use strict';

var app = require('../../app');
var request = require('supertest');

var newExpense;

describe('Expense API:', function() {

  describe('GET /api/expenses', function() {
    var expenses;

    beforeEach(function(done) {
      request(app)
        .get('/api/expenses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expenses = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expenses.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/expenses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/expenses')
        .send({
          name: 'New Expense',
          info: 'This is the brand new expense!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newExpense = res.body;
          done();
        });
    });

    it('should respond with the newly created expense', function() {
      newExpense.name.should.equal('New Expense');
      newExpense.info.should.equal('This is the brand new expense!!!');
    });

  });

  describe('GET /api/expenses/:id', function() {
    var expense;

    beforeEach(function(done) {
      request(app)
        .get('/api/expenses/' + newExpense._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          expense = res.body;
          done();
        });
    });

    afterEach(function() {
      expense = {};
    });

    it('should respond with the requested expense', function() {
      expense.name.should.equal('New Expense');
      expense.info.should.equal('This is the brand new expense!!!');
    });

  });

  describe('PUT /api/expenses/:id', function() {
    var updatedExpense

    beforeEach(function(done) {
      request(app)
        .put('/api/expenses/' + newExpense._id)
        .send({
          name: 'Updated Expense',
          info: 'This is the updated expense!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedExpense = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedExpense = {};
    });

    it('should respond with the updated expense', function() {
      updatedExpense.name.should.equal('Updated Expense');
      updatedExpense.info.should.equal('This is the updated expense!!!');
    });

  });

  describe('DELETE /api/expenses/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/expenses/' + newExpense._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when expense does not exist', function(done) {
      request(app)
        .delete('/api/expenses/' + newExpense._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
