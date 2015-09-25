'use strict';

angular.module('mcmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('patients', {
        url: '/patients',
        templateUrl: 'app/patients/patients.html',
        controller: 'PatientsCtrl'
      });
  });
