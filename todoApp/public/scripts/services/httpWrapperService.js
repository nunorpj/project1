angular.module('myApp').service('httpWraperService', function($http, $location) {

    //Default Params
    this.protocol = window.location.protocol;
    this.host = window.location.host;
    this.header;  


    this.setProtocol = function(prtcl) {
        this.protocol=prtcl;
    }

    this.setHost = function(hst){
        this.host=hst;
    }


    this.setHeader = function(hdr) {
        this.header= hdr;
    }
    

    //login, registry
    this.publicPost= function(path,data,cb){
        let url = this.protocol + '//' + this.host + path; 
        $http.post(url,data).then(cb)
    }



    this.privateGet = function(path,cb){
        if(!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path; 
        $http.get(url,this.header).then(cb);
    }


    this.privatePost =function(path,data,cb){
        if(!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;     
        $http.post(url,data,this.header).then(cb);
    }

    this.privatePut = function(path,data,cb){
        if(!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;    
        $http.put(url,data,this.header).then(cb);
    }

    this.privateDelete = function(path,cb){
        if(!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;    
        $http.delete(url,this.header).then(cb)
    }

    this.checkHeader = function(){
        if(!this.header){
            $location.path('/');
            return false
        }
        return true
    }

    this.responseError = function(error){
        if(error.status==403){
            console.log("access forbidden " + 403)
            $location.path('/');
        }
    }

});