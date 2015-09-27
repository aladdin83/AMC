'use strict';

angular.module('mcmsApp')
  .controller('PatientsCtrl', function ($scope, $http) {
    
    $scope.patient = {};
    $scope.patients = [];
    
    $http.get('/api/patients').success(function(patients){
      $scope.patients = patients;
    });
    
    $scope.openProfile = function(patient){
      $scope.patient = patient;
    }
    
  });
