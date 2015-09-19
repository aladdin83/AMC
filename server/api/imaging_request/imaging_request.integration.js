'use strict';

var app = require('../../app');
var request = require('supertest');

var newImagingRequest;

describe('ImagingRequest API:', function() {

  describe('GET /api/imaging_requests', function() {
    var imagingRequests;

    beforeEach(function(done) {
      request(app)
        .get('/api/imaging_requests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          imagingRequests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      imagingRequests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/imaging_requests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/imaging_requests')
        .send({
          name: 'New ImagingRequest',
          info: 'This is the brand new imagingRequest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newImagingRequest = res.body;
          done();
        });
    });

    it('should respond with the newly created imagingRequest', function() {
      newImagingRequest.name.should.equal('New ImagingRequest');
      newImagingRequest.info.should.equal('This is the brand new imagingRequest!!!');
    });

  });

  describe('GET /api/imaging_requests/:id', function() {
    var imagingRequest;

    beforeEach(function(done) {
      request(app)
        .get('/api/imaging_requests/' + newImagingRequest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          imagingRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      imagingRequest = {};
    });

    it('should respond with the requested imagingRequest', function() {
      imagingRequest.name.should.equal('New ImagingRequest');
      imagingRequest.info.should.equal('This is the brand new imagingRequest!!!');
    });

  });

  describe('PUT /api/imaging_requests/:id', function() {
    var updatedImagingRequest

    beforeEach(function(done) {
      request(app)
        .put('/api/imaging_requests/' + newImagingRequest._id)
        .send({
          name: 'Updated ImagingRequest',
          info: 'This is the updated imagingRequest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedImagingRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedImagingRequest = {};
    });

    it('should respond with the updated imagingRequest', function() {
      updatedImagingRequest.name.should.equal('Updated ImagingRequest');
      updatedImagingRequest.info.should.equal('This is the updated imagingRequest!!!');
    });

  });

  describe('DELETE /api/imaging_requests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/imaging_requests/' + newImagingRequest._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when imagingRequest does not exist', function(done) {
      request(app)
        .delete('/api/imaging_requests/' + newImagingRequest._id)
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
