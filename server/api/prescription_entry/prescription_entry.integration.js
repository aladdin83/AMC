'use strict';

var app = require('../../app');
var request = require('supertest');

var newPrescriptionEntry;

describe('PrescriptionEntry API:', function() {

  describe('GET /api/prescription_entries', function() {
    var prescriptionEntrys;

    beforeEach(function(done) {
      request(app)
        .get('/api/prescription_entries')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          prescriptionEntrys = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      prescriptionEntrys.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/prescription_entries', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/prescription_entries')
        .send({
          name: 'New PrescriptionEntry',
          info: 'This is the brand new prescriptionEntry!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newPrescriptionEntry = res.body;
          done();
        });
    });

    it('should respond with the newly created prescriptionEntry', function() {
      newPrescriptionEntry.name.should.equal('New PrescriptionEntry');
      newPrescriptionEntry.info.should.equal('This is the brand new prescriptionEntry!!!');
    });

  });

  describe('GET /api/prescription_entries/:id', function() {
    var prescriptionEntry;

    beforeEach(function(done) {
      request(app)
        .get('/api/prescription_entries/' + newPrescriptionEntry._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          prescriptionEntry = res.body;
          done();
        });
    });

    afterEach(function() {
      prescriptionEntry = {};
    });

    it('should respond with the requested prescriptionEntry', function() {
      prescriptionEntry.name.should.equal('New PrescriptionEntry');
      prescriptionEntry.info.should.equal('This is the brand new prescriptionEntry!!!');
    });

  });

  describe('PUT /api/prescription_entries/:id', function() {
    var updatedPrescriptionEntry

    beforeEach(function(done) {
      request(app)
        .put('/api/prescription_entries/' + newPrescriptionEntry._id)
        .send({
          name: 'Updated PrescriptionEntry',
          info: 'This is the updated prescriptionEntry!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedPrescriptionEntry = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedPrescriptionEntry = {};
    });

    it('should respond with the updated prescriptionEntry', function() {
      updatedPrescriptionEntry.name.should.equal('Updated PrescriptionEntry');
      updatedPrescriptionEntry.info.should.equal('This is the updated prescriptionEntry!!!');
    });

  });

  describe('DELETE /api/prescription_entries/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/prescription_entries/' + newPrescriptionEntry._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when prescriptionEntry does not exist', function(done) {
      request(app)
        .delete('/api/prescription_entries/' + newPrescriptionEntry._id)
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
