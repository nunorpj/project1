'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  , 'ngMaterial', 'ngMessages', 'ngStorage','ui.router'
]).
config(['$stateProvider', function($stateProvider) {
 
 
  var home = {
    name: 'home',
    url: '/',
    templateUrl: "templates/home.html"
  }
  var dashboard = {
    name: 'dashboard',
    url: '/dashboard',
    templateUrl: "templates/dashboard.html"
  }
 
  $stateProvider.state(home);
  $stateProvider.state(dashboard);
 

}])
.run(function($rootScope, $location, $localStorage,httpWraperService){

        // keep user logged in after page refresh
        if ($localStorage.currentUser) {
          httpWraperService.setHeader({ headers: {'Authorization': 'Bearer ' + $localStorage.currentUser.token}});
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

