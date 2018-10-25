'use strict';

angular.module('myApp')
    .controller('AddController', function ($scope, $mdDialog, todoService) {

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
                todoService.addTodo({
                    text,
                    goalDate
                }).the(result => {
                    if (result.data.todo)
                        $scope.todos.push(result.data.todo)
                    $mdDialog.hide();
                }).catch(err => {
                    console.log(err)
                })
            }

        };
    });