'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var patientAppointmentCtrlStub = {
  index: 'patientAppointmentCtrl.index',
  show: 'patientAppointmentCtrl.show',
  create: 'patientAppointmentCtrl.create',
  update: 'patientAppointmentCtrl.update',
  destroy: 'patientAppointmentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var patientAppointmentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './patient_appointment.controller': patientAppointmentCtrlStub
});

describe('PatientAppointment API Router:', function() {

  it('should return an express router instance', function() {
    patientAppointmentIndex.should.equal(routerStub);
  });

  describe('GET /api/patient_appointments', function() {

    it('should route to patientAppointment.controller.index', function() {
      routerStub.get
                .withArgs('/', 'patientAppointmentCtrl.index')
                .should.have.been.calledOnce;
    });

  });

  describe('GET /api/patient_appointments/:id', function() {

    it('should route to patientAppointment.controller.show', function() {
      routerStub.get
                .withArgs('/:id', 'patientAppointmentCtrl.show')
                .should.have.been.calledOnce;
    });

  });

  describe('POST /api/patient_appointments', function() {

    it('should route to patientAppointment.controller.create', function() {
      routerStub.post
                .withArgs('/', 'patientAppointmentCtrl.create')
                .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/patient_appointments/:id', function() {

    it('should route to patientAppointment.controller.update', function() {
      routerStub.put
                .withArgs('/:id', 'patientAppointmentCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/patient_appointments/:id', function() {

    it('should route to patientAppointment.controller.update', function() {
      routerStub.patch
                .withArgs('/:id', 'patientAppointmentCtrl.update')
                .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/patient_appointments/:id', function() {

    it('should route to patientAppointment.controller.destroy', function() {
      routerStub.delete
                .withArgs('/:id', 'patientAppointmentCtrl.destroy')
                .should.have.been.calledOnce;
    });

  });

});
