'use strict';

var app = require('../../app');
var request = require('supertest');

var newPatientAppointment;

describe('PatientAppointment API:', function() {

  describe('GET /api/patient_appointments', function() {
    var patientAppointments;

    beforeEach(function(done) {
      request(app)
        .get('/api/patient_appointments')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patientAppointments = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      patientAppointments.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/patient_appointments', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/patient_appointments')
        .send({
          name: 'New PatientAppointment',
          info: 'This is the brand new patientAppointment!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPatientAppointment = res.body;
          done();
        });
    });

    it('should respond with the newly created patientAppointment', function() {
      newPatientAppointment.name.should.equal('New PatientAppointment');
      newPatientAppointment.info.should.equal('This is the brand new patientAppointment!!!');
    });

  });

  describe('GET /api/patient_appointments/:id', function() {
    var patientAppointment;

    beforeEach(function(done) {
      request(app)
        .get('/api/patient_appointments/' + newPatientAppointment._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          patientAppointment = res.body;
          done();
        });
    });

    afterEach(function() {
      patientAppointment = {};
    });

    it('should respond with the requested patientAppointment', function() {
      patientAppointment.name.should.equal('New PatientAppointment');
      patientAppointment.info.should.equal('This is the brand new patientAppointment!!!');
    });

  });

  describe('PUT /api/patient_appointments/:id', function() {
    var updatedPatientAppointment

    beforeEach(function(done) {
      request(app)
        .put('/api/patient_appointments/' + newPatientAppointment._id)
        .send({
          name: 'Updated PatientAppointment',
          info: 'This is the updated patientAppointment!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPatientAppointment = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPatientAppointment = {};
    });

    it('should respond with the updated patientAppointment', function() {
      updatedPatientAppointment.name.should.equal('Updated PatientAppointment');
      updatedPatientAppointment.info.should.equal('This is the updated patientAppointment!!!');
    });

  });

  describe('DELETE /api/patient_appointments/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/patient_appointments/' + newPatientAppointment._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when patientAppointment does not exist', function(done) {
      request(app)
        .delete('/api/patient_appointments/' + newPatientAppointment._id)
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
