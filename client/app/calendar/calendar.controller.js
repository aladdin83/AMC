'use strict';

angular.module('mcmsApp')
  .controller('CalendarCtrl', function ($scope) {
    //var date = new Date();
    
    $scope.uiConfig = {
      calendar: {
        editable: true,
        defaultView: 'agendaWeek',
        header:{
          left: 'title',
          center: '',
          right: 'today prev, next'
        }
      }
    };
    
    $scope.eventSources = [$scope.eventF];
    
    $scope.renderCalender = function(calendar){
      console.log(calendar);
    };
    
    
  });
