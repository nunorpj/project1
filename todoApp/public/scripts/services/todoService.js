angular.module('myApp').service('todoService', function($http) {

    this.getTodos=function(cb){
        $http.get('http://localhost:9999/api/todos/')
        .then(cb);

    }

    this.addTodo=function(data,cb){
       data.date = new Date();

            $http.post('http://localhost:9999/api/insert/',data)
        .then(cb);

    }

    this.deleteTodo =function(data,cb){

        console.log(data)
        $http.delete('http://localhost:9999/api/delete/'+data._id)
    .then(cb);
    }

    this.editTodo = function(data,cb){

        $http.put('http://localhost:9999/api/edit/',data)
        .then(cb);
    }
})