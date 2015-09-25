'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vitalReadingCtrlStub = {
  index: 'vitalReadingCtrl.index',
  show: 'vitalReadingCtrl.show',
  create: 'vitalReadingCtrl.create',
  update: 'vitalReadingCtrl.update',
  destroy: 'vitalReadingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vitalReadingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vital_reading.controller': vitalReadingCtrlStub
});

describe('VitalReading API Router:', function() {

  it('should return an express router instance', function() {
    vitalReadingIndex.should.equal(routerStub);
  });

  describe('GET /api/vital_readings', function() {

    it('should route to vitalReading.controller.index', function() {
      routerStub.get
                .withArgs('/', 'vitalReadingCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/vital_readings/:id', function() {

    it('should route to vitalReading.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'vitalReadingCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/vital_readings', function() {

    it('should route to vitalReading.controller.create', function() {
      routerStub.post
                .withArgs('/', 'vitalReadingCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/vital_readings/:id', function() {

    it('should route to vitalReading.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'vitalReadingCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vital_readings/:id', function() {

    it('should route to vitalReading.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'vitalReadingCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vital_readings/:id', function() {

    it('should route to vitalReading.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'vitalReadingCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
