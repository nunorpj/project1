'use strict';

angular.module('myApp')
    .controller('AddController', function ($scope, $mdDialog, todoService) {

        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.add = function (text, goalDate, todoFile) {
            if (!text) {
                return
            } else {
                var fd = new FormData();
                fd.append("text", text);
                fd.append("goalDate", goalDate)
                fd.append("date", new Date())

                if (todoFile) {
                    fd.append('file', todoFile);
                }
                todoService.addTodo(fd).then(result => {

                    if (result.data.todo)
                        $scope.todos.push(result.data.todo)
                    $mdDialog.hide();

                }).catch(err => {
                    console.log(err)
                })

            }

        };
    });