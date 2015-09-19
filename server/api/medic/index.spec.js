'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var medicCtrlStub = {
  index: 'medicCtrl.index',
  show: 'medicCtrl.show',
  create: 'medicCtrl.create',
  update: 'medicCtrl.update',
  destroy: 'medicCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var medicIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './medic.controller': medicCtrlStub
});

describe('Medic API Router:', function() {

  it('should return an express router instance', function() {
    medicIndex.should.equal(routerStub);
  });

  describe('GET /api/medics', function() {

    it('should route to medic.controller.index', function() {
      routerStub.get
                .withArgs('/', 'medicCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/medics/:id', function() {

    it('should route to medic.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'medicCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/medics', function() {

    it('should route to medic.controller.create', function() {
      routerStub.post
                .withArgs('/', 'medicCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/medics/:id', function() {

    it('should route to medic.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'medicCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/medics/:id', function() {

    it('should route to medic.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'medicCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/medics/:id', function() {

    it('should route to medic.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'medicCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
