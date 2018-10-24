'use strict';

angular.module('myApp')
    .controller('AddController', function ($scope, $mdDialog, todoService,$rootScope) {
        
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.add = function (text, goalDate) {
            if (!text) {

                return

            } else {
                todoService.addTodo({text,goalDate}, function (result) {
                    if (result.data.t[0])
                      $scope.todos.push(result.data.t[0])
                      $mdDialog.hide();
                }).catch(err=>{
                    console.log(err.data)
                })
            }

        };
    });