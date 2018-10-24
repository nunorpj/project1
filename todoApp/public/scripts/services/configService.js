angular.module('myApp').service('configService', function($http, httpWraperService) {

    this.getUser= function(cb){
        httpWraperService.privateGet('/api/user',cb);
    }
        
    this.updateUser= function(data,cb){
        return httpWraperService.privatePut('/api/user', data, cb);
    }

});