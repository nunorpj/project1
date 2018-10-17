angular.module('myApp').service('httpWraperService', function($http,$localStorage) {

    //Default Params
    this.protocol = window.location.protocol;
    this.host = window.location.host;


    this.setProtocol = function(prtcl) {
        this.protocol=prtcl;
    }

    this.setHost = function(hst){
        this.host=hst;
    }
    

    //login, registry
    this.publicPost= function(path,data,cb){
        let url = this.protocol + '//' + this.host + path; 
        $http.post(url,data).then(cb)
    }



    this.privateGet = function(path,cb){
        let header = { headers: {'Authorization': 'Bearer ' + $localStorage.currentUser.token}}       
        let url = this.protocol + '//' + this.host + path; 
        $http.get(url,header).then(cb);
    }


    this.privatePost =function(path,data,cb){
        let header = { headers: {'Authorization': 'Bearer ' + $localStorage.currentUser.token}}       
        let url = this.protocol + '//' + this.host + path;     
        $http.post(url,data,header).then(cb);
    }


    this.privatePut = function(path,data,cb){
        let header = { headers: {'Authorization': 'Bearer ' + $localStorage.currentUser.token}}       
        let url = this.protocol + '//' + this.host + path;    
        $http.put(url,data,header).then(cb);
    }

    this.privateDelete = function(path,cb){
        let header = { headers: {'Authorization': 'Bearer ' + $localStorage.currentUser.token}}       
        let url = this.protocol + '//' + this.host + path;    
        $http.delete(url,header).then(cb)
    }


});