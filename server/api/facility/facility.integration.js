'use strict';

var app = require('../../app');
var request = require('supertest');

var newFacility;

describe('Facility API:', function() {

  describe('GET /api/facilities', function() {
    var facilitys;

    beforeEach(function(done) {
      request(app)
        .get('/api/facilities')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          facilitys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      facilitys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/facilities', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/facilities')
        .send({
          name: 'New Facility',
          info: 'This is the brand new facility!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newFacility = res.body;
          done();
        });
    });

    it('should respond with the newly created facility', function() {
      newFacility.name.should.equal('New Facility');
      newFacility.info.should.equal('This is the brand new facility!!!');
    });

  });

  describe('GET /api/facilities/:id', function() {
    var facility;

    beforeEach(function(done) {
      request(app)
        .get('/api/facilities/' + newFacility._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          facility = res.body;
          done();
        });
    });

    afterEach(function() {
      facility = {};
    });

    it('should respond with the requested facility', function() {
      facility.name.should.equal('New Facility');
      facility.info.should.equal('This is the brand new facility!!!');
    });

  });

  describe('PUT /api/facilities/:id', function() {
    var updatedFacility

    beforeEach(function(done) {
      request(app)
        .put('/api/facilities/' + newFacility._id)
        .send({
          name: 'Updated Facility',
          info: 'This is the updated facility!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFacility = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFacility = {};
    });

    it('should respond with the updated facility', function() {
      updatedFacility.name.should.equal('Updated Facility');
      updatedFacility.info.should.equal('This is the updated facility!!!');
    });

  });

  describe('DELETE /api/facilities/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/facilities/' + newFacility._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when facility does not exist', function(done) {
      request(app)
        .delete('/api/facilities/' + newFacility._id)
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
