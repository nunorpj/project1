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
    


    this.publicPost= function(path,data,cb){
        let url = this.protocol + '//' + this.host + path; 
        $http.post(url,data).then(cb)
    }



    this.privateGet = function(path,cb){
        let header = { headers: {'Authorization': 'Bearer ' + $localStorage.currentUser.token}}       
        let url = this.protocol + '//' + this.host + path; 
        $http.get(url,header).then(cb);
    }



});