'use strict';

var app = require('../../app');
var request = require('supertest');

var newLabTest;

describe('LabTest API:', function() {

  describe('GET /api/lab_tests', function() {
    var labTests;

    beforeEach(function(done) {
      request(app)
        .get('/api/lab_tests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          labTests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      labTests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/lab_tests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/lab_tests')
        .send({
          name: 'New LabTest',
          info: 'This is the brand new labTest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newLabTest = res.body;
          done();
        });
    });

    it('should respond with the newly created labTest', function() {
      newLabTest.name.should.equal('New LabTest');
      newLabTest.info.should.equal('This is the brand new labTest!!!');
    });

  });

  describe('GET /api/lab_tests/:id', function() {
    var labTest;

    beforeEach(function(done) {
      request(app)
        .get('/api/lab_tests/' + newLabTest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          labTest = res.body;
          done();
        });
    });

    afterEach(function() {
      labTest = {};
    });

    it('should respond with the requested labTest', function() {
      labTest.name.should.equal('New LabTest');
      labTest.info.should.equal('This is the brand new labTest!!!');
    });

  });

  describe('PUT /api/lab_tests/:id', function() {
    var updatedLabTest

    beforeEach(function(done) {
      request(app)
        .put('/api/lab_tests/' + newLabTest._id)
        .send({
          name: 'Updated LabTest',
          info: 'This is the updated labTest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedLabTest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedLabTest = {};
    });

    it('should respond with the updated labTest', function() {
      updatedLabTest.name.should.equal('Updated LabTest');
      updatedLabTest.info.should.equal('This is the updated labTest!!!');
    });

  });

  describe('DELETE /api/lab_tests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/lab_tests/' + newLabTest._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when labTest does not exist', function(done) {
      request(app)
        .delete('/api/lab_tests/' + newLabTest._id)
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
