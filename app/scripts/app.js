'use strict';

angular
  .module('angularDashboardApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    /*'ngGrid',*/
    'highcharts-ng',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MyCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
