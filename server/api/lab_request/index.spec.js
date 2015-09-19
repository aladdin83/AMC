'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var labRequestCtrlStub = {
  index: 'labRequestCtrl.index',
  show: 'labRequestCtrl.show',
  create: 'labRequestCtrl.create',
  update: 'labRequestCtrl.update',
  destroy: 'labRequestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var labRequestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './lab_request.controller': labRequestCtrlStub
});

describe('LabRequest API Router:', function() {

  it('should return an express router instance', function() {
    labRequestIndex.should.equal(routerStub);
  });

  describe('GET /api/lab_requests', function() {

    it('should route to labRequest.controller.index', function() {
      routerStub.get
                .withArgs('/', 'labRequestCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/lab_requests/:id', function() {

    it('should route to labRequest.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'labRequestCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/lab_requests', function() {

    it('should route to labRequest.controller.create', function() {
      routerStub.post
                .withArgs('/', 'labRequestCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/lab_requests/:id', function() {

    it('should route to labRequest.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'labRequestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/lab_requests/:id', function() {

    it('should route to labRequest.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'labRequestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/lab_requests/:id', function() {

    it('should route to labRequest.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'labRequestCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
