'use strict';

var app = require('../../app');
var request = require('supertest');

var newImagingTest;

describe('ImagingTest API:', function() {

  describe('GET /api/imaging_tests', function() {
    var imagingTests;

    beforeEach(function(done) {
      request(app)
        .get('/api/imaging_tests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          imagingTests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      imagingTests.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/imaging_tests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/imaging_tests')
        .send({
          name: 'New ImagingTest',
          info: 'This is the brand new imagingTest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newImagingTest = res.body;
          done();
        });
    });

    it('should respond with the newly created imagingTest', function() {
      newImagingTest.name.should.equal('New ImagingTest');
      newImagingTest.info.should.equal('This is the brand new imagingTest!!!');
    });

  });

  describe('GET /api/imaging_tests/:id', function() {
    var imagingTest;

    beforeEach(function(done) {
      request(app)
        .get('/api/imaging_tests/' + newImagingTest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          imagingTest = res.body;
          done();
        });
    });

    afterEach(function() {
      imagingTest = {};
    });

    it('should respond with the requested imagingTest', function() {
      imagingTest.name.should.equal('New ImagingTest');
      imagingTest.info.should.equal('This is the brand new imagingTest!!!');
    });

  });

  describe('PUT /api/imaging_tests/:id', function() {
    var updatedImagingTest

    beforeEach(function(done) {
      request(app)
        .put('/api/imaging_tests/' + newImagingTest._id)
        .send({
          name: 'Updated ImagingTest',
          info: 'This is the updated imagingTest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedImagingTest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedImagingTest = {};
    });

    it('should respond with the updated imagingTest', function() {
      updatedImagingTest.name.should.equal('Updated ImagingTest');
      updatedImagingTest.info.should.equal('This is the updated imagingTest!!!');
    });

  });

  describe('DELETE /api/imaging_tests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/imaging_tests/' + newImagingTest._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when imagingTest does not exist', function(done) {
      request(app)
        .delete('/api/imaging_tests/' + newImagingTest._id)
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
