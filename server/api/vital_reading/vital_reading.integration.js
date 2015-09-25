'use strict';

var app = require('../../app');
var request = require('supertest');

var newVitalReading;

describe('VitalReading API:', function() {

  describe('GET /api/vital_readings', function() {
    var vitalReadings;

    beforeEach(function(done) {
      request(app)
        .get('/api/vital_readings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          vitalReadings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      vitalReadings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/vital_readings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vital_readings')
        .send({
          name: 'New VitalReading',
          info: 'This is the brand new vitalReading!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newVitalReading = res.body;
          done();
        });
    });

    it('should respond with the newly created vitalReading', function() {
      newVitalReading.name.should.equal('New VitalReading');
      newVitalReading.info.should.equal('This is the brand new vitalReading!!!');
    });

  });

  describe('GET /api/vital_readings/:id', function() {
    var vitalReading;

    beforeEach(function(done) {
      request(app)
        .get('/api/vital_readings/' + newVitalReading._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          vitalReading = res.body;
          done();
        });
    });

    afterEach(function() {
      vitalReading = {};
    });

    it('should respond with the requested vitalReading', function() {
      vitalReading.name.should.equal('New VitalReading');
      vitalReading.info.should.equal('This is the brand new vitalReading!!!');
    });

  });

  describe('PUT /api/vital_readings/:id', function() {
    var updatedVitalReading

    beforeEach(function(done) {
      request(app)
        .put('/api/vital_readings/' + newVitalReading._id)
        .send({
          name: 'Updated VitalReading',
          info: 'This is the updated vitalReading!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVitalReading = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVitalReading = {};
    });

    it('should respond with the updated vitalReading', function() {
      updatedVitalReading.name.should.equal('Updated VitalReading');
      updatedVitalReading.info.should.equal('This is the updated vitalReading!!!');
    });

  });

  describe('DELETE /api/vital_readings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vital_readings/' + newVitalReading._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vitalReading does not exist', function(done) {
      request(app)
        .delete('/api/vital_readings/' + newVitalReading._id)
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
