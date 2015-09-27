'use strict';

angular.module('mcmsApp')
  .controller('PatientProfileCtrl', function ($scope, $stateParams, $http) {
	  $scope.patient = {};
	  $http.get('/api/patients/' + $stateParams.id).success(function(patient){
		  $scope.patient = patient;
	  });
    
    $scope.profileMenu = [
      {
        'title': 'Summery',
        'state': '.summery'
      },{
        'title': 'Medications',
        'state': '.medications'
      },{
        'title': 'History',
        'state': '.history',
      },{
        'title': 'Allergies',
        'state': '.allergies'
      },{
        'title': 'Vitals',
        'state': '.vitals'
      },{
        'title': 'Notes',
        'state': '.notes'
      }
    ]
    
  });