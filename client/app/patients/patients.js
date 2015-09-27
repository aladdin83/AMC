'use strict';

angular.module('mcmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('patients', {
        url: '/patients',
        templateUrl: 'app/patients/patients.html',
        controller: 'PatientsCtrl'
      })
      .state('patientProfile', {
        url: '/patients/:id',
        templateUrl: 'app/patients/patient_profile.html',
        controller: 'PatientProfileCtrl'
      })
      .state('patientProfile.summery',{
        url: '/summery',
        templateUrl: 'app/patients/patient_profile.summery.html' 
      })
      .state('patientProfile.medications',{
        url: '/medications'
      })
      .state('patientProfile.history',{
        url: '/history'
      })
      .state('patientProfile.allergies',{
        url: '/allergies'
      })
      .state('patientProfile.vitals',{
        url: '/vitals'
      })
      .state('patientProfile.notes',{
        url: '/notes'
      })
      ;
  });
