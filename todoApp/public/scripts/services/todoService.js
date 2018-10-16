angular.module('myApp').service('todoService', function($http) {

    this.getTodos=function(cb){


        console.log(window)
        $http.get(window.location.protocol + '//' + window.location.host +'/api/todos/')
        .then(cb);

    }

    this.addTodo=function(data,cb){
       data.date = new Date();

            $http.post(window.location.protocol + '//' + window.location.host +'/api/insert/',data)
        .then(cb);

    }

    this.deleteTodo =function(data,cb){

        $http.delete(window.location.protocol + '//' + window.location.host +'/api/delete/'+data._id)
    .then(cb);
    }

    this.editTodo = function(data,cb){

        $http.put(window.location.protocol + '//' + window.location.host +'/api/edit/',data)
        .then(cb);
    }
})