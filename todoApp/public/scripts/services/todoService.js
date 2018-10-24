angular.module('myApp').service('todoService', function($http,httpWraperService) {

    this.getTodos=function(cb){

        httpWraperService.privateGet('/api/todos/',cb);
       // $http.get(window.location.protocol + '//' + window.location.host +'/api/todos/')
       // .then(cb);

    }

    this.addTodo=function(data,cb){
       data.date = new Date();

       return httpWraperService.privatePost('/api/insert/',data,cb);

    }

    this.deleteTodo =function(data,cb){

        return httpWraperService.privateDelete('/api/delete/'+data._id, cb)

    }

    this.editTodo = function(data,cb){

       return httpWraperService.privatePut('/api/edit/',data,cb)

    }
})