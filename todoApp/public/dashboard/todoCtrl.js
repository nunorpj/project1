'use strict';

angular.module('myApp')
.controller('todoCtrl', function($scope,todoService) {
 
    $scope.deleteTodo =function(data,index) {
        todoService.deleteTodo(data,function(result){
            console.log(result)
            $scope.todos.splice(index, 1);

        })
    }

});