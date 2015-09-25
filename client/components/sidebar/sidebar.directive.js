'use strict';

angular.module('mcmsApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'components/sidebar/sidebar.html',
      restrict: 'E',
      controller: 'SidebarCtrl'
    };
  });
