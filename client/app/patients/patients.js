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
        url: '/medications',
        templateUrl: 'app/patients/patient_profile.medications.html'
      })
      .state('patientProfile.history',{
        url: '/history',
        templateUrl: 'app/patients/patient_profile.history.html'
      })
      .state('patientProfile.allergies',{
        url: '/allergies',
        templateUrl: 'app/patients/patient_profile.allergies.html'
      })
      .state('patientProfile.vitals',{
        url: '/vitals',
        templateUrl: 'app/patients/patient_profile.vitals.html'
      })
      .state('patientProfile.notes',{
        url: '/notes',
        templateUrl: 'app/patients/patient_profile.notes.html'
      })
      .state('patientProfile.documents',{
        url: '/documents',
        templateUrl: 'app/patients/patient_profile.documents.html'
      })
      ;
  });
