angular.module('myApp').factory("httpResErrorInterceptor",function($q,$location){

    return{
        responseError: function(rejection){
            if(rejection.status===401){
                $location.path('/')
            }
            return $q.reject(rejection);
        }
    }

})