'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var imagingRequestCtrlStub = {
  index: 'imagingRequestCtrl.index',
  show: 'imagingRequestCtrl.show',
  create: 'imagingRequestCtrl.create',
  update: 'imagingRequestCtrl.update',
  destroy: 'imagingRequestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var imagingRequestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './imaging_request.controller': imagingRequestCtrlStub
});

describe('ImagingRequest API Router:', function() {

  it('should return an express router instance', function() {
    imagingRequestIndex.should.equal(routerStub);
  });

  describe('GET /api/imaging_requests', function() {

    it('should route to imagingRequest.controller.index', function() {
      routerStub.get
                .withArgs('/', 'imagingRequestCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/imaging_requests/:id', function() {

    it('should route to imagingRequest.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'imagingRequestCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/imaging_requests', function() {

    it('should route to imagingRequest.controller.create', function() {
      routerStub.post
                .withArgs('/', 'imagingRequestCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/imaging_requests/:id', function() {

    it('should route to imagingRequest.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'imagingRequestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/imaging_requests/:id', function() {

    it('should route to imagingRequest.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'imagingRequestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/imaging_requests/:id', function() {

    it('should route to imagingRequest.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'imagingRequestCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
