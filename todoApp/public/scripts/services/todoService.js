angular.module('myApp').service('todoService', function($http,httpWraperService) {

    this.getTodos=function(cb){

        httpWraperService.privateGet('/api/todos/',cb);
       // $http.get(window.location.protocol + '//' + window.location.host +'/api/todos/')
       // .then(cb);

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