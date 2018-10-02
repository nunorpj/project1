'use strict';

angular.module('myApp')
.directive('todo', function(){
  return {
    templateUrl: "dashboard/todo.html",
    replace: true,
    controller: 'todoCtrl'
  }
});