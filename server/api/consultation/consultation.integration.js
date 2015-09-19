'use strict';

var app = require('../../app');
var request = require('supertest');

var newConsultation;

describe('Consultation API:', function() {

  describe('GET /api/consultations', function() {
    var consultations;

    beforeEach(function(done) {
      request(app)
        .get('/api/consultations')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          consultations = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      consultations.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/consultations', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/consultations')
        .send({
          name: 'New Consultation',
          info: 'This is the brand new consultation!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newConsultation = res.body;
          done();
        });
    });

    it('should respond with the newly created consultation', function() {
      newConsultation.name.should.equal('New Consultation');
      newConsultation.info.should.equal('This is the brand new consultation!!!');
    });

  });

  describe('GET /api/consultations/:id', function() {
    var consultation;

    beforeEach(function(done) {
      request(app)
        .get('/api/consultations/' + newConsultation._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          consultation = res.body;
          done();
        });
    });

    afterEach(function() {
      consultation = {};
    });

    it('should respond with the requested consultation', function() {
      consultation.name.should.equal('New Consultation');
      consultation.info.should.equal('This is the brand new consultation!!!');
    });

  });

  describe('PUT /api/consultations/:id', function() {
    var updatedConsultation

    beforeEach(function(done) {
      request(app)
        .put('/api/consultations/' + newConsultation._id)
        .send({
          name: 'Updated Consultation',
          info: 'This is the updated consultation!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedConsultation = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedConsultation = {};
    });

    it('should respond with the updated consultation', function() {
      updatedConsultation.name.should.equal('Updated Consultation');
      updatedConsultation.info.should.equal('This is the updated consultation!!!');
    });

  });

  describe('DELETE /api/consultations/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/consultations/' + newConsultation._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when consultation does not exist', function(done) {
      request(app)
        .delete('/api/consultations/' + newConsultation._id)
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
