'use strict';

var app = require('../../app');
var request = require('supertest');

var newLabRequest;

describe('LabRequest API:', function() {

  describe('GET /api/lab_requests', function() {
    var labRequests;

    beforeEach(function(done) {
      request(app)
        .get('/api/lab_requests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          labRequests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      labRequests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/lab_requests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lab_requests')
        .send({
          name: 'New LabRequest',
          info: 'This is the brand new labRequest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newLabRequest = res.body;
          done();
        });
    });

    it('should respond with the newly created labRequest', function() {
      newLabRequest.name.should.equal('New LabRequest');
      newLabRequest.info.should.equal('This is the brand new labRequest!!!');
    });

  });

  describe('GET /api/lab_requests/:id', function() {
    var labRequest;

    beforeEach(function(done) {
      request(app)
        .get('/api/lab_requests/' + newLabRequest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          labRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      labRequest = {};
    });

    it('should respond with the requested labRequest', function() {
      labRequest.name.should.equal('New LabRequest');
      labRequest.info.should.equal('This is the brand new labRequest!!!');
    });

  });

  describe('PUT /api/lab_requests/:id', function() {
    var updatedLabRequest

    beforeEach(function(done) {
      request(app)
        .put('/api/lab_requests/' + newLabRequest._id)
        .send({
          name: 'Updated LabRequest',
          info: 'This is the updated labRequest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLabRequest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLabRequest = {};
    });

    it('should respond with the updated labRequest', function() {
      updatedLabRequest.name.should.equal('Updated LabRequest');
      updatedLabRequest.info.should.equal('This is the updated labRequest!!!');
    });

  });

  describe('DELETE /api/lab_requests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/lab_requests/' + newLabRequest._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when labRequest does not exist', function(done) {
      request(app)
        .delete('/api/lab_requests/' + newLabRequest._id)
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
