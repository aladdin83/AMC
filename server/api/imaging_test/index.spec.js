'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var imagingTestCtrlStub = {
  index: 'imagingTestCtrl.index',
  show: 'imagingTestCtrl.show',
  create: 'imagingTestCtrl.create',
  update: 'imagingTestCtrl.update',
  destroy: 'imagingTestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var imagingTestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './imaging_test.controller': imagingTestCtrlStub
});

describe('ImagingTest API Router:', function() {

  it('should return an express router instance', function() {
    imagingTestIndex.should.equal(routerStub);
  });

  describe('GET /api/imaging_tests', function() {

    it('should route to imagingTest.controller.index', function() {
      routerStub.get
                .withArgs('/', 'imagingTestCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/imaging_tests/:id', function() {

    it('should route to imagingTest.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'imagingTestCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/imaging_tests', function() {

    it('should route to imagingTest.controller.create', function() {
      routerStub.post
                .withArgs('/', 'imagingTestCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/imaging_tests/:id', function() {

    it('should route to imagingTest.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'imagingTestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/imaging_tests/:id', function() {

    it('should route to imagingTest.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'imagingTestCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/imaging_tests/:id', function() {

    it('should route to imagingTest.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'imagingTestCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
