'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute', 'ngMaterial', 'ngMessages', 'ngStorage'
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
.run(function($rootScope, $http, $location, $localStorage){

        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
          $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
      }

      // redirect to login page if not logged in and trying to access a restricted page
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          var publicPages = ['/'];
          var restrictedPage = publicPages.indexOf($location.path()) === -1;
          if (restrictedPage && !$localStorage.currentUser) {
              $location.path('/');
          }
      });
  
});

