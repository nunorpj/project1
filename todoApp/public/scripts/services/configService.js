angular.module('myApp').service('configService', function($http, httpWraperService) {

    this.getUser= function(){
        return httpWraperService.privateGet('/api/user/user');
    }
        
    this.updateUser= function(data,cb){
        return httpWraperService.privatePut('/api/user/user', data);
    }

});