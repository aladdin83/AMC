'use strict';

angular.module('mcmsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('messages', {
        url: '/messages',
        templateUrl: 'app/messages/messages.html',
        controller: 'MessagesCtrl'
      });
  });
