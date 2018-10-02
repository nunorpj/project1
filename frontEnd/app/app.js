'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial', 'ngMessages'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when("/dashboard",{
    templateUrl: "dashboard/dashboard.html"
  })
  .when("/",{
    templateUrl: "homepage/home.html"
  })
  .otherwise({ redirectTo: '/'});

  
}]);
