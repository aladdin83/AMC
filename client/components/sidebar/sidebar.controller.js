'use strict';

angular.module('mcmsApp')
  .controller('SidebarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Dashboard',
      'state': 'dashboard',
      'iconClass': 'fa fa-dashboard fa-2x'
    },{
      'title': 'Calendar',
      'state': 'calendar',
      'iconClass': 'fa fa-calendar fa-2x'
    },{
      'title': 'Patients',
      'state': 'patients',
      'iconClass': 'fa fa-users fa-2x'
    },{
      'title': 'Settings',
      'state': 'settings',
      'iconClass': 'fa fa-gear fa-2x'
    },{
      'title': 'Messages',
      'state': 'messages',
      'iconClass': 'fa fa-envelope fa-2x'
    }];
    
    $scope.hideSideBar = $location.path() === '/login';

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
