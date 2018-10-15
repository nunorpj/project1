angular.module('myApp').service('configService', function($http, $rootScope) {

    this.getUser= function(cb){
        $http.get('/api/user')
        .then(cb);
    }
        
    this.updateUser= function(data,cb){
        $http.put('/api/user',data)
        .then(cb);
    }

});