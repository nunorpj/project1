angular.module('myApp').service('configService', function($http, httpWraperService) {

    this.getUser= function(){
        return httpWraperService.privateGet('/api/user/user');
    }
        
    this.updateUser= function(data){
        return httpWraperService.privatePut('/api/user/user', data);
    }


    this.updatePic= function(data){
        return httpWraperService.privatePostFile('/api/user/img',data)
    }

    this.getPic = function(){
        return httpWraperService.privateGet('/api/user/img')
    }




});