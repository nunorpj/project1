angular.module('myApp').service('todoService', function($http,httpWraperService) {

    this.getTodos=function(){

        return httpWraperService.privateGet('/api/todo/todos/');


    }

    this.addTodo=function(data){
       return httpWraperService.privatePost('/api/todo/insert/',data);

    }

    this.deleteTodo =function(data){

        return httpWraperService.privateDelete('/api/todo/delete/'+data._id)

    }

    this.editTodo = function(data){

       return httpWraperService.privatePut('/api/todo/edit/',data)

    }


})