'use strict';

angular.module('myApp')
  .controller('mainCtrl', function ($scope, $mdDialog, $rootScope, $location, todoService,$mdToast, configService) {

    todoService.getTodos(function (data) {
      console.log(data.data)
      $scope.todos = data.data;
    })

    $scope.deleteTodo = function (data, index) {
      todoService.deleteTodo(data, function (result) {
        //  $scope.todos.splice(index, 1);
        todoService.getTodos(function (data) {
          $scope.todos = data.data;
        })
      })
    }


    $scope.saveSucess = function() {
      $mdToast.show(

        $mdToast.simple()
          .textContent('Users configs saved successfully!')
        .theme('success-toast')
          .hideDelay(3000)
          .position('bottom')
      );
    };


    $scope.showConfigs = function (ev) {
      $mdDialog.show({
          controller: configController,
          templateUrl: 'templates/userConfigs.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function (user) {
          if (!user)
            console.log("no data")
          else {

            configService.updateUser(user, response => {
              if(response.data.name){
                $rootScope.globals.currentUser.user = response.data.name;
                $scope.saveSucess();
              }else{

              }
              /////////
            })
          }
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function configController($scope, $mdDialog) {

      configService.getUser(response => {
        $scope.user = response.data;
      })

      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.save = function (user) {
        $mdDialog.hide(user);
      };
    }




    $scope.showAdvanced = function (ev) {
      $mdDialog.show({
          controller: DialogController,
          templateUrl: 'templates/add.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose: true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function (data) {
          if (!data)
            console.log("no data")
          else {
            todoService.addTodo(data, function (result) {
              console.log(result.data.t[0])
              if (result.data.t[0])
                $scope.todos.push(result.data.t[0]);
            })
          }
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog) {
      $scope.hide = function () {
        $mdDialog.hide();
      };

      $scope.cancel = function () {
        $mdDialog.cancel();
      };

      $scope.add = function(text,goalDate) {

        $mdDialog.hide({text,goalDate});
      };
    }
  });