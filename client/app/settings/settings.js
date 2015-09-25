'use strict';

angular.module('mcmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('settings', {
        url: '/settings',
        templateUrl: 'app/settings/settings.html',
        controller: 'SettingsCtrl'
      });
  });
