'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var labTestCtrlStub = {
  index: 'labTestCtrl.index',
  show: 'labTestCtrl.show',
  create: 'labTestCtrl.create',
  update: 'labTestCtrl.update',
  destroy: 'labTestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var labTestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './lab_test.controller': labTestCtrlStub
});

describe('LabTest API Router:', function() {

  it('should return an express router instance', function() {
    labTestIndex.should.equal(routerStub);
  });

  describe('GET /api/lab_tests', function() {

    it('should route to labTest.controller.index', function() {
      routerStub.get
                .withArgs('/', 'labTestCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/lab_tests/:id', function() {

    it('should route to labTest.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'labTestCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/lab_tests', function() {

    it('should route to labTest.controller.create', function() {
      routerStub.post
                .withArgs('/', 'labTestCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/lab_tests/:id', function() {

    it('should route to labTest.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'labTestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/lab_tests/:id', function() {

    it('should route to labTest.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'labTestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/lab_tests/:id', function() {

    it('should route to labTest.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'labTestCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
