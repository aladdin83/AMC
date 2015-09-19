'use strict';

var app = require('../../app');
var request = require('supertest');

var newBill;

describe('Bill API:', function() {

  describe('GET /api/bills', function() {
    var bills;

    beforeEach(function(done) {
      request(app)
        .get('/api/bills')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bills = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bills.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bills', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bills')
        .send({
          name: 'New Bill',
          info: 'This is the brand new bill!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBill = res.body;
          done();
        });
    });

    it('should respond with the newly created bill', function() {
      newBill.name.should.equal('New Bill');
      newBill.info.should.equal('This is the brand new bill!!!');
    });

  });

  describe('GET /api/bills/:id', function() {
    var bill;

    beforeEach(function(done) {
      request(app)
        .get('/api/bills/' + newBill._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bill = res.body;
          done();
        });
    });

    afterEach(function() {
      bill = {};
    });

    it('should respond with the requested bill', function() {
      bill.name.should.equal('New Bill');
      bill.info.should.equal('This is the brand new bill!!!');
    });

  });

  describe('PUT /api/bills/:id', function() {
    var updatedBill

    beforeEach(function(done) {
      request(app)
        .put('/api/bills/' + newBill._id)
        .send({
          name: 'Updated Bill',
          info: 'This is the updated bill!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBill = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBill = {};
    });

    it('should respond with the updated bill', function() {
      updatedBill.name.should.equal('Updated Bill');
      updatedBill.info.should.equal('This is the updated bill!!!');
    });

  });

  describe('DELETE /api/bills/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bills/' + newBill._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bill does not exist', function(done) {
      request(app)
        .delete('/api/bills/' + newBill._id)
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
