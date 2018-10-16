angular.module('myApp').service('configService', function($http, httpWraperService) {

    this.getUser= function(cb){
        httpWraperService.privateGet('/api/user',cb);
        
        
    }
        
    this.updateUser= function(data,cb){
        $http.put(window.location.protocol + '//' + window.location.host +'/api/user',data)
        .then(cb);
    }

});