'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var prescriptionEntryCtrlStub = {
  index: 'prescriptionEntryCtrl.index',
  show: 'prescriptionEntryCtrl.show',
  create: 'prescriptionEntryCtrl.create',
  update: 'prescriptionEntryCtrl.update',
  destroy: 'prescriptionEntryCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var prescriptionEntryIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './prescription_entry.controller': prescriptionEntryCtrlStub
});

describe('PrescriptionEntry API Router:', function() {

  it('should return an express router instance', function() {
    prescriptionEntryIndex.should.equal(routerStub);
  });

  describe('GET /api/prescription_entries', function() {

    it('should route to prescriptionEntry.controller.index', function() {
      routerStub.get
                .withArgs('/', 'prescriptionEntryCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/prescription_entries/:id', function() {

    it('should route to prescriptionEntry.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'prescriptionEntryCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/prescription_entries', function() {

    it('should route to prescriptionEntry.controller.create', function() {
      routerStub.post
                .withArgs('/', 'prescriptionEntryCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/prescription_entries/:id', function() {

    it('should route to prescriptionEntry.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'prescriptionEntryCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/prescription_entries/:id', function() {

    it('should route to prescriptionEntry.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'prescriptionEntryCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/prescription_entries/:id', function() {

    it('should route to prescriptionEntry.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'prescriptionEntryCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
