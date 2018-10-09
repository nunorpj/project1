'use strict';

angular.module('myApp')
.directive('todo', function(){
  return {
    templateUrl: "templates/todo.html",
    replace: true,
    controller: 'todoCtrl'
  }
});