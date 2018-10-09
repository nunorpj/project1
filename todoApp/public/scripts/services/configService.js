angular.module('myApp').service('configService', function($http, $rootScope) {

    this.getUser= function(cb){
        $http.get('http://localhost:9999/api/user')
        .then(cb);
    }
        
    this.updateUser= function(data,cb){
        $http.put('http://localhost:9999/api/user',data)
        .then(cb);
    }

});