angular.module('myApp').service('configService', function($http, $rootScope) {

    this.getUser= function(cb){
        $http.get(window.location.protocol + '//' + window.location.host +'/api/user')
        .then(cb);
    }
        
    this.updateUser= function(data,cb){
        $http.put(window.location.protocol + '//' + window.location.host +'/api/user',data)
        .then(cb);
    }

});