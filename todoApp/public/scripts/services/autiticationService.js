angular.module('myApp').service('autenticationService', function($localStorage,httpWraperService) {

    this.login= function(email,password){
        return httpWraperService.publicPost('/api/auth/login',{ email: email, password: password })
    }
        
    this.registry= function(data){
       return httpWraperService.publicPost('/api/auth/registry',data)
    }

    this.SetCredentials = function(data){
     
        $localStorage.currentUser = { 
            user: data.name, 
            token: data.token,
        };

        httpWraperService.setHeader({ headers: {
            'Authorization': 'Bearer ' + $localStorage.currentUser.token,
        }});


    }

    //para quando fizer log out
    this.ClearCredentials = function(){
        delete $localStorage.currentUser;

    }
});