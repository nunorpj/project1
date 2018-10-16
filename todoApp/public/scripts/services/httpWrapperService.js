angular.module('myApp').service('httpWraperService', function($http) {

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
        $http.post(path,data).then(cb)
    }

});