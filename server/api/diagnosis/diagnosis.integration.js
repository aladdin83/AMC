'use strict';

var app = require('../../app');
var request = require('supertest');

var newDiagnosis;

describe('Diagnosis API:', function() {

  describe('GET /api/diagnosiss', function() {
    var diagnosiss;

    beforeEach(function(done) {
      request(app)
        .get('/api/diagnosiss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          diagnosiss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      diagnosiss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/diagnosiss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/diagnosiss')
        .send({
          name: 'New Diagnosis',
          info: 'This is the brand new diagnosis!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newDiagnosis = res.body;
          done();
        });
    });

    it('should respond with the newly created diagnosis', function() {
      newDiagnosis.name.should.equal('New Diagnosis');
      newDiagnosis.info.should.equal('This is the brand new diagnosis!!!');
    });

  });

  describe('GET /api/diagnosiss/:id', function() {
    var diagnosis;

    beforeEach(function(done) {
      request(app)
        .get('/api/diagnosiss/' + newDiagnosis._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          diagnosis = res.body;
          done();
        });
    });

    afterEach(function() {
      diagnosis = {};
    });

    it('should respond with the requested diagnosis', function() {
      diagnosis.name.should.equal('New Diagnosis');
      diagnosis.info.should.equal('This is the brand new diagnosis!!!');
    });

  });

  describe('PUT /api/diagnosiss/:id', function() {
    var updatedDiagnosis

    beforeEach(function(done) {
      request(app)
        .put('/api/diagnosiss/' + newDiagnosis._id)
        .send({
          name: 'Updated Diagnosis',
          info: 'This is the updated diagnosis!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedDiagnosis = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedDiagnosis = {};
    });

    it('should respond with the updated diagnosis', function() {
      updatedDiagnosis.name.should.equal('Updated Diagnosis');
      updatedDiagnosis.info.should.equal('This is the updated diagnosis!!!');
    });

  });

  describe('DELETE /api/diagnosiss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/diagnosiss/' + newDiagnosis._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when diagnosis does not exist', function(done) {
      request(app)
        .delete('/api/diagnosiss/' + newDiagnosis._id)
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
