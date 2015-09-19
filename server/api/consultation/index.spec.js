'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var consultationCtrlStub = {
  index: 'consultationCtrl.index',
  show: 'consultationCtrl.show',
  create: 'consultationCtrl.create',
  update: 'consultationCtrl.update',
  destroy: 'consultationCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var consultationIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './consultation.controller': consultationCtrlStub
});

describe('Consultation API Router:', function() {

  it('should return an express router instance', function() {
    consultationIndex.should.equal(routerStub);
  });

  describe('GET /api/consultations', function() {

    it('should route to consultation.controller.index', function() {
      routerStub.get
                .withArgs('/', 'consultationCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/consultations/:id', function() {

    it('should route to consultation.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'consultationCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/consultations', function() {

    it('should route to consultation.controller.create', function() {
      routerStub.post
                .withArgs('/', 'consultationCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/consultations/:id', function() {

    it('should route to consultation.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'consultationCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/consultations/:id', function() {

    it('should route to consultation.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'consultationCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/consultations/:id', function() {

    it('should route to consultation.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'consultationCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
