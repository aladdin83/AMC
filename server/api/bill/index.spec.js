'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var billCtrlStub = {
  index: 'billCtrl.index',
  show: 'billCtrl.show',
  create: 'billCtrl.create',
  update: 'billCtrl.update',
  destroy: 'billCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var billIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bill.controller': billCtrlStub
});

describe('Bill API Router:', function() {

  it('should return an express router instance', function() {
    billIndex.should.equal(routerStub);
  });

  describe('GET /api/bills', function() {

    it('should route to bill.controller.index', function() {
      routerStub.get
                .withArgs('/', 'billCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bills/:id', function() {

    it('should route to bill.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'billCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bills', function() {

    it('should route to bill.controller.create', function() {
      routerStub.post
                .withArgs('/', 'billCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bills/:id', function() {

    it('should route to bill.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'billCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bills/:id', function() {

    it('should route to bill.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'billCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bills/:id', function() {

    it('should route to bill.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'billCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
