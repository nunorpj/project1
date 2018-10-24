'use strict';

angular.module('myApp')
  .controller('mainCtrl', function ($rootScope, $localStorage, $scope, $mdDialog, $location, todoService, $mdToast, autenticationService) {
    $scope.username = $localStorage.currentUser.user;

    

    todoService.getTodos(function (data) {
      $scope.todos = data.data;
    })




    $scope.logout = function () {
      autenticationService.ClearCredentials();
      $location.path('/');
    }


    $scope.openMenu = function ($mdMenu, ev) {
      $mdMenu.open(ev);
    };

    $scope.toastShow = function (msg) {
      $mdToast.show(

        $mdToast.simple()
        .textContent(msg)
        .hideDelay(3000)
        .position('bottom')
      );
    };


    $scope.showConfigs = function (ev) {
      $mdDialog.show({
        controller: "configController",
        templateUrl: 'templates/userConfigs.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope.$new(false, $scope), 
        preserveScope: false,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })

    };

    $scope.showAdvanced = function (ev) {
      $mdDialog.show({
        controller: "AddController",
        templateUrl: 'templates/add.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        scope: $scope.$new(false, $scope), 
        preserveScope: false,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
    };


  });