angular.module('myApp').service('autenticationService', function($http,$localStorage) {

    this.login= function(email,password,cb){

        console.log(email)
        console.log(password)

        $http.post('http://localhost:9999/api/login', { email: email, password: password })
        .then(cb);

    }
        
    this.registry= function(data,cb){
        $http.post('http://localhost:9999/api/registry', data)
        .then(cb);
    }

    this.SetCredentials = function(data){
        $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

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