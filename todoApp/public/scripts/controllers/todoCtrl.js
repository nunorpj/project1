'use strict';

angular.module('myApp')
    .controller('todoCtrl', function ($scope, $window, todoService, $timeout) {

        var screenWidth = $window.innerWidth;
        if (screenWidth < 1200) {
            $scope.mobile = true;
        } else {
            $scope.mobile = false;
        }

        angular.element($window).bind('resize', function () {

            var screenWidth = $window.innerWidth;

            // manuall $digest required as resize event
            // is outside of angular
            $scope.$digest();

            if (screenWidth < 1200) {
                $scope.mobile = true;
            } else {
                $scope.mobile = false;
            }
        });








        $scope.editTodo = function (data) {
            todoService.editTodo(data, function (result) {
                $scope.editing=false;
            }).catch(err=>{
                console.log(err)
            })
        }




        $scope.deleteTodo = function (data, index) {
            todoService.deleteTodo(data, function (result) {
              //  $scope.todos.splice(index, 1);        
              todoService.getTodos(function (data) {
                $scope.$parent.todos = data.data;
        
              })
            }).catch(err=>{
                console.log(err)
            })
          }


    });