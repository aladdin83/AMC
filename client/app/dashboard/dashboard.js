'use strict';

angular.module('mcmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  });
