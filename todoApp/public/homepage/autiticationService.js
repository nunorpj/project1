angular.module('myApp').service('autenticationService', function($http, $rootScope) {

    this.login= function(email,password,cb){

        $http.post('http://localhost:9999/api/login', { email: email, password: password })
        .then(cb);

    }
            

    this.SetCredentials = function(data){
        //maybe uma wild encriptaçao nisto
        $rootScope.globals = {
            currentUser: {
                user: data.user,
                token: data.token,
            }
        }
        console.log($rootScope.globals)

        $http.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;

    }

    //para quando fizer log out
    this.ClearCredentials = function(){
        $rootScope.globals = {};
        $http.defaults.headers.common.Authorization = 'Bearer';
    }
});