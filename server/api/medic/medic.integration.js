'use strict';

var app = require('../../app');
var request = require('supertest');

var newMedic;

describe('Medic API:', function() {

  describe('GET /api/medics', function() {
    var medics;

    beforeEach(function(done) {
      request(app)
        .get('/api/medics')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          medics = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      medics.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/medics', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/medics')
        .send({
          name: 'New Medic',
          info: 'This is the brand new medic!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newMedic = res.body;
          done();
        });
    });

    it('should respond with the newly created medic', function() {
      newMedic.name.should.equal('New Medic');
      newMedic.info.should.equal('This is the brand new medic!!!');
    });

  });

  describe('GET /api/medics/:id', function() {
    var medic;

    beforeEach(function(done) {
      request(app)
        .get('/api/medics/' + newMedic._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          medic = res.body;
          done();
        });
    });

    afterEach(function() {
      medic = {};
    });

    it('should respond with the requested medic', function() {
      medic.name.should.equal('New Medic');
      medic.info.should.equal('This is the brand new medic!!!');
    });

  });

  describe('PUT /api/medics/:id', function() {
    var updatedMedic

    beforeEach(function(done) {
      request(app)
        .put('/api/medics/' + newMedic._id)
        .send({
          name: 'Updated Medic',
          info: 'This is the updated medic!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMedic = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMedic = {};
    });

    it('should respond with the updated medic', function() {
      updatedMedic.name.should.equal('Updated Medic');
      updatedMedic.info.should.equal('This is the updated medic!!!');
    });

  });

  describe('DELETE /api/medics/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/medics/' + newMedic._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when medic does not exist', function(done) {
      request(app)
        .delete('/api/medics/' + newMedic._id)
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
