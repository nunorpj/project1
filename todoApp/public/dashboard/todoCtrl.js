'use strict';

angular.module('myApp')
.controller('todoCtrl', function($scope,todoService) {
 


    $scope.editTodo = function(data){
        todoService.editTodo(data,function(result){
            console.log(result)
        })
    }


});