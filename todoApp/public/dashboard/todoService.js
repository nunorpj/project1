angular.module('myApp').service('todoService', function($http,$rootScope) {

    this.getTodos=function(cb){

        if( $rootScope.globals.currentUser==undefined)
            return;
        $http.get('http://localhost:9999/api/todos/'+$rootScope.globals.currentUser.user._id)
        .then(cb);

    }

    this.addTodo=function(data,cb){

        if( $rootScope.globals.currentUser==undefined)
            return;
       
       
            $http.post('http://localhost:9999/api/insert/'+$rootScope.globals.currentUser.user._id,data)
        .then(cb);

    }

    this.deleteTodo =function(data,cb){
        if( $rootScope.globals.currentUser==undefined)
        return;
   
   
        $http.delete('http://localhost:9999/api/delete/'+data._id,data)
    .then(cb);
    }

})