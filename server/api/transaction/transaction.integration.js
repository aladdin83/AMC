'use strict';

var app = require('../../app');
var request = require('supertest');

var newTransaction;

describe('Transaction API:', function() {

  describe('GET /api/transactions', function() {
    var transactions;

    beforeEach(function(done) {
      request(app)
        .get('/api/transactions')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          transactions = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      transactions.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/transactions', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/transactions')
        .send({
          name: 'New Transaction',
          info: 'This is the brand new transaction!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTransaction = res.body;
          done();
        });
    });

    it('should respond with the newly created transaction', function() {
      newTransaction.name.should.equal('New Transaction');
      newTransaction.info.should.equal('This is the brand new transaction!!!');
    });

  });

  describe('GET /api/transactions/:id', function() {
    var transaction;

    beforeEach(function(done) {
      request(app)
        .get('/api/transactions/' + newTransaction._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          transaction = res.body;
          done();
        });
    });

    afterEach(function() {
      transaction = {};
    });

    it('should respond with the requested transaction', function() {
      transaction.name.should.equal('New Transaction');
      transaction.info.should.equal('This is the brand new transaction!!!');
    });

  });

  describe('PUT /api/transactions/:id', function() {
    var updatedTransaction

    beforeEach(function(done) {
      request(app)
        .put('/api/transactions/' + newTransaction._id)
        .send({
          name: 'Updated Transaction',
          info: 'This is the updated transaction!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTransaction = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTransaction = {};
    });

    it('should respond with the updated transaction', function() {
      updatedTransaction.name.should.equal('Updated Transaction');
      updatedTransaction.info.should.equal('This is the updated transaction!!!');
    });

  });

  describe('DELETE /api/transactions/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/transactions/' + newTransaction._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when transaction does not exist', function(done) {
      request(app)
        .delete('/api/transactions/' + newTransaction._id)
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
