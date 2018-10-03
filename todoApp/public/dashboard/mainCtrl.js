'use strict';

angular.module('myApp')
.controller('mainCtrl', function($scope,$mdDialog, $rootScope,$location,todoService){
  
  
   if( $rootScope.globals.currentUser==undefined)
      $location.path('/')

  todoService.getTodos(function(data){
    $scope.todos=data.data;
  })







  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'dashboard/add.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
    })
    .then(function(data) {
     if(!data)
        console.log("no data")
      else{
        todoService.addTodo(data,function(result){
          //VER ISTO
        $scope.todos.push(data);
      })
      }
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
  
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.add = function(text,date) {

      $mdDialog.hide({text,date});
    };
  }
});