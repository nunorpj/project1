'use strict';

angular.module('myApp')
.controller('todoCtrl', function($scope,$window,todoService,$timeout) {
 
    var screenWidth = $window.innerWidth;

    if (screenWidth < 700){
        $scope.mobile = true;
    }else{
        $scope.mobile = false;
    }


    $scope.editTodo = function(data){
        todoService.editTodo(data,function(result){
            console.log(result)
        })
    }


      

});