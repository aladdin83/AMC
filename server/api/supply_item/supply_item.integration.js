'use strict';

var app = require('../../app');
var request = require('supertest');

var newSupplyItem;

describe('SupplyItem API:', function() {

  describe('GET /api/supply_items', function() {
    var supplyItems;

    beforeEach(function(done) {
      request(app)
        .get('/api/supply_items')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          supplyItems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      supplyItems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/supply_items', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/supply_items')
        .send({
          name: 'New SupplyItem',
          info: 'This is the brand new supplyItem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newSupplyItem = res.body;
          done();
        });
    });

    it('should respond with the newly created supplyItem', function() {
      newSupplyItem.name.should.equal('New SupplyItem');
      newSupplyItem.info.should.equal('This is the brand new supplyItem!!!');
    });

  });

  describe('GET /api/supply_items/:id', function() {
    var supplyItem;

    beforeEach(function(done) {
      request(app)
        .get('/api/supply_items/' + newSupplyItem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          supplyItem = res.body;
          done();
        });
    });

    afterEach(function() {
      supplyItem = {};
    });

    it('should respond with the requested supplyItem', function() {
      supplyItem.name.should.equal('New SupplyItem');
      supplyItem.info.should.equal('This is the brand new supplyItem!!!');
    });

  });

  describe('PUT /api/supply_items/:id', function() {
    var updatedSupplyItem

    beforeEach(function(done) {
      request(app)
        .put('/api/supply_items/' + newSupplyItem._id)
        .send({
          name: 'Updated SupplyItem',
          info: 'This is the updated supplyItem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSupplyItem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSupplyItem = {};
    });

    it('should respond with the updated supplyItem', function() {
      updatedSupplyItem.name.should.equal('Updated SupplyItem');
      updatedSupplyItem.info.should.equal('This is the updated supplyItem!!!');
    });

  });

  describe('DELETE /api/supply_items/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/supply_items/' + newSupplyItem._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when supplyItem does not exist', function(done) {
      request(app)
        .delete('/api/supply_items/' + newSupplyItem._id)
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
