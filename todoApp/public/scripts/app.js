'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngMaterial', 'ngMessages'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when("/dashboard",{
    templateUrl: "templates/dashboard.html"
  })
  .when("/",{
    templateUrl: "templates/home.html"
  })
  .otherwise({ redirectTo: '/'});

  
}])
.run(function($rootScope,$location){


  $rootScope.$on('$locationChangeStart', function (event, next, current) {
    // redirect to login page if not logged in
    if ($location.path() !== '/' && $rootScope.globals.currentUser == undefined) {
        $location.path('/');
    }
});
  
});

