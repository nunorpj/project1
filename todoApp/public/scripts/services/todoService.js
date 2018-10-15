angular.module('myApp').service('todoService', function($http) {

    this.getTodos=function(cb){
        $http.get('/api/todos/')
        .then(cb);

    }

    this.addTodo=function(data,cb){
       data.date = new Date();

            $http.post('/api/insert/',data)
        .then(cb);

    }

    this.deleteTodo =function(data,cb){

        $http.delete('/api/delete/'+data._id)
    .then(cb);
    }

    this.editTodo = function(data,cb){

        $http.put('/api/edit/',data)
        .then(cb);
    }
})