angular.module('myApp').service('configService', function($http, httpWraperService) {

    this.getUser= function(cb){
        httpWraperService.privateGet('/api/user/user',cb);
    }
        
    this.updateUser= function(data,cb){
        return httpWraperService.privatePut('/api/user/user', data, cb);
    }

});