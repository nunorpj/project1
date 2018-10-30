'use strict';

angular.module('myApp')
    .controller('todoCtrl', function ($scope, $window, todoService, $timeout) {

        if($scope.todo.filePath!="no file")
            $scope.todo.filePath = window.location.protocol + "//" + window.location.host + "/api/todo/file/" + $scope.todo._id + "?cb=" + new Date().toString();



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

            if (!data.text) {
                return
            } else {
                var fd = new FormData();
                fd.append("id", data._id);
                fd.append("text", data.text);
                fd.append("goalDate", data.goalDate)
                fd.append("done",data.done )
            if($scope.todoFile){
                fd.append('file', $scope.todoFile);
            }
            todoService.editTodo(fd).then(result=> {
                $scope.editing=false;
                if($scope.todoFile){
                    $scope.todo.filePath = window.location.protocol + "//" + window.location.host + "/api/todo/file/" + $scope.todo._id + "?cb=" + new Date().toString();
                    $scope.todo.fileName =result.data.fileName;
                }
            }).catch(err=>{
                console.log(err)
            })
                
            }

            

            
        }


        $scope.deleteTodoFile = function(data){
            todoService.deleteTodoFile(data).then(result=>{
                $scope.todo.fileName= "no file"
                $scope.todo.filePath= "no file"
                }).catch(err=>{
                    console.log(err)
                })
        }



        $scope.deleteTodo = function (data, index) {
            todoService.deleteTodo(data).then(result=> {
                
              //  $scope.todos.splice(index, 1);        
              todoService.getTodos().then(res=>{
                console.log("aqui")
                $scope.$parent.todos = res.data;
        
              })
            }).catch(err=>{
                console.log(err)
            })
          }


    });