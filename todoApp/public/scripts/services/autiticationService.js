angular.module('myApp').service('autenticationService', function($localStorage,httpWraperService) {






    this.login= function(email,password,cb){
        httpWraperService.publicPost('/api/login',{ email: email, password: password },cb)
    }
        
    this.registry= function(data,cb){
        httpWraperService.publicPost('/api/registry',data,cb)
    }

    this.SetCredentials = function(data){
     
        $localStorage.currentUser = { 
            user: data.user.name, 
            token: data.token,
        };

        httpWraperService.setHeader({ headers: {'Authorization': 'Bearer ' + $localStorage.currentUser.token}});


    }

    //para quando fizer log out
    this.ClearCredentials = function(){
        delete $localStorage.currentUser;

    }
});