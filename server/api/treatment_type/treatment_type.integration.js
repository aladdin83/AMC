'use strict';

var app = require('../../app');
var request = require('supertest');

var newTreatmentType;

describe('TreatmentType API:', function() {

  describe('GET /api/treatment_types', function() {
    var treatmentTypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/treatment_types')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          treatmentTypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      treatmentTypes.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/treatment_types', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/treatment_types')
        .send({
          name: 'New TreatmentType',
          info: 'This is the brand new treatmentType!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTreatmentType = res.body;
          done();
        });
    });

    it('should respond with the newly created treatmentType', function() {
      newTreatmentType.name.should.equal('New TreatmentType');
      newTreatmentType.info.should.equal('This is the brand new treatmentType!!!');
    });

  });

  describe('GET /api/treatment_types/:id', function() {
    var treatmentType;

    beforeEach(function(done) {
      request(app)
        .get('/api/treatment_types/' + newTreatmentType._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          treatmentType = res.body;
          done();
        });
    });

    afterEach(function() {
      treatmentType = {};
    });

    it('should respond with the requested treatmentType', function() {
      treatmentType.name.should.equal('New TreatmentType');
      treatmentType.info.should.equal('This is the brand new treatmentType!!!');
    });

  });

  describe('PUT /api/treatment_types/:id', function() {
    var updatedTreatmentType

    beforeEach(function(done) {
      request(app)
        .put('/api/treatment_types/' + newTreatmentType._id)
        .send({
          name: 'Updated TreatmentType',
          info: 'This is the updated treatmentType!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTreatmentType = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTreatmentType = {};
    });

    it('should respond with the updated treatmentType', function() {
      updatedTreatmentType.name.should.equal('Updated TreatmentType');
      updatedTreatmentType.info.should.equal('This is the updated treatmentType!!!');
    });

  });

  describe('DELETE /api/treatment_types/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/treatment_types/' + newTreatmentType._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when treatmentType does not exist', function(done) {
      request(app)
        .delete('/api/treatment_types/' + newTreatmentType._id)
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
