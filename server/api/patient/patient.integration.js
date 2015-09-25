'use strict';

var app = require('../../app');
var request = require('supertest');

var newPatient;

describe('Patient API:', function() {

  describe('GET /api/patients', function() {
    var patients;

    beforeEach(function(done) {
      request(app)
        .get('/api/patients')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patients = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      patients.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/patients', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/patients')
        .send({
          title: 'mr',
          first_name: 'fname',
          middle_name: 'mname',
          last_name: 'lname',
          info: 'This is the brand new patient!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPatient = res.body;
          done();
        });
    });

    it('should respond with the newly created patient', function() {
      newPatient.fullName.should.equal('mr fname mname lname');
      newPatient.info.should.equal('This is the brand new patient!!!');
    });

  });

  describe('GET /api/patients/:id', function() {
    var patient;

    beforeEach(function(done) {
      request(app)
        .get('/api/patients/' + newPatient._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patient = res.body;
          done();
        });
    });

    afterEach(function() {
      patient = {};
    });

    it('should respond with the requested patient', function() {
      patient.fullName.should.equal('mr fname mname lname');
      patient.info.should.equal('This is the brand new patient!!!');
    });

  });

  describe('PUT /api/patients/:id', function() {
    var updatedPatient

    beforeEach(function(done) {
      request(app)
        .put('/api/patients/' + newPatient._id)
        .send({
          name: 'Updated Patient',
          info: 'This is the updated patient!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPatient = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPatient = {};
    });

    it('should respond with the updated patient', function() {
      updatedPatient.name.should.equal('Updated Patient');
      updatedPatient.info.should.equal('This is the updated patient!!!');
    });

  });

  describe('DELETE /api/patients/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/patients/' + newPatient._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when patient does not exist', function(done) {
      request(app)
        .delete('/api/patients/' + newPatient._id)
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
