'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var facilityCtrlStub = {
  index: 'facilityCtrl.index',
  show: 'facilityCtrl.show',
  create: 'facilityCtrl.create',
  update: 'facilityCtrl.update',
  destroy: 'facilityCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var facilityIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './facility.controller': facilityCtrlStub
});

describe('Facility API Router:', function() {

  it('should return an express router instance', function() {
    facilityIndex.should.equal(routerStub);
  });

  describe('GET /api/facilities', function() {

    it('should route to facility.controller.index', function() {
      routerStub.get
                .withArgs('/', 'facilityCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/facilities/:id', function() {

    it('should route to facility.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'facilityCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/facilities', function() {

    it('should route to facility.controller.create', function() {
      routerStub.post
                .withArgs('/', 'facilityCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/facilities/:id', function() {

    it('should route to facility.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'facilityCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/facilities/:id', function() {

    it('should route to facility.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'facilityCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/facilities/:id', function() {

    it('should route to facility.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'facilityCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
