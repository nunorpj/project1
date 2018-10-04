'use strict';

angular.module('myApp')
.controller('mainCtrl', function($scope,$mdDialog, $rootScope,$location,todoService){
  
  
   if( $rootScope.globals.currentUser==undefined)
      $location.path('/')

  todoService.getTodos(function(data){
    console.log(data.data)
    $scope.todos=data.data;
  })

  $scope.deleteTodo =function(data,index) {
    todoService.deleteTodo(data,function(result){
     //  $scope.todos.splice(index, 1);
       todoService.getTodos(function(data){
        $scope.todos=data.data;
      })
    })
}





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
        console.log(result.data.t[0])
        if(result.data.t[0])
          $scope.todos.push(result.data.t[0]);
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

    $scope.add = function(text,goalDate) {

      $mdDialog.hide({text,goalDate});
    };
  }
});