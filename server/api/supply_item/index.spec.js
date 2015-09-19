'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var supplyItemCtrlStub = {
  index: 'supplyItemCtrl.index',
  show: 'supplyItemCtrl.show',
  create: 'supplyItemCtrl.create',
  update: 'supplyItemCtrl.update',
  destroy: 'supplyItemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var supplyItemIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './supply_item.controller': supplyItemCtrlStub
});

describe('SupplyItem API Router:', function() {

  it('should return an express router instance', function() {
    supplyItemIndex.should.equal(routerStub);
  });

  describe('GET /api/supply_items', function() {

    it('should route to supplyItem.controller.index', function() {
      routerStub.get
                .withArgs('/', 'supplyItemCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/supply_items/:id', function() {

    it('should route to supplyItem.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'supplyItemCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/supply_items', function() {

    it('should route to supplyItem.controller.create', function() {
      routerStub.post
                .withArgs('/', 'supplyItemCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/supply_items/:id', function() {

    it('should route to supplyItem.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'supplyItemCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/supply_items/:id', function() {

    it('should route to supplyItem.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'supplyItemCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/supply_items/:id', function() {

    it('should route to supplyItem.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'supplyItemCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
