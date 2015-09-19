'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var diagnosisCtrlStub = {
  index: 'diagnosisCtrl.index',
  show: 'diagnosisCtrl.show',
  create: 'diagnosisCtrl.create',
  update: 'diagnosisCtrl.update',
  destroy: 'diagnosisCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var diagnosisIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './diagnosis.controller': diagnosisCtrlStub
});

describe('Diagnosis API Router:', function() {

  it('should return an express router instance', function() {
    diagnosisIndex.should.equal(routerStub);
  });

  describe('GET /api/diagnosiss', function() {

    it('should route to diagnosis.controller.index', function() {
      routerStub.get
                .withArgs('/', 'diagnosisCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/diagnosiss/:id', function() {

    it('should route to diagnosis.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'diagnosisCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/diagnosiss', function() {

    it('should route to diagnosis.controller.create', function() {
      routerStub.post
                .withArgs('/', 'diagnosisCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/diagnosiss/:id', function() {

    it('should route to diagnosis.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'diagnosisCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/diagnosiss/:id', function() {

    it('should route to diagnosis.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'diagnosisCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/diagnosiss/:id', function() {

    it('should route to diagnosis.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'diagnosisCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
