angular.module('myApp').service('autenticationService', function($http,$localStorage,httpWraperService) {






    this.login= function(email,password,cb){
        httpWraperService.publicPost('/api/login',{ email: email, password: password },cb)
    }
        
    this.registry= function(data,cb){
        httpWraperService.publicPost('/api/registry',data,cb)
    }

    this.SetCredentials = function(data){
      //  $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

        $localStorage.currentUser = { 
            user: data.user.name, 
            token: data.token,
        };

    }

    //para quando fizer log out
    this.ClearCredentials = function(){
        $http.defaults.headers.common.Authorization = '';
        delete $localStorage.currentUser;

    }
});