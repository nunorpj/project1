angular.module('myApp').service('httpWraperService', function($http) {

    this.protocol = window.location.protocol;
    this.host = window.location.host;


    this.setProtocol = function(prtcl) {
        this.protocol=prtcl;
    }

    this.setHost = function(hst){
        this.host=hst;
    }
    
    


});