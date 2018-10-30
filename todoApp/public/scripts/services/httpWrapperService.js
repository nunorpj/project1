angular.module('myApp').service('httpWraperService', function ($http, $location) {

    //Default Params
    this.protocol = window.location.protocol;
    this.host = window.location.host;
    this.header;


    this.setProtocol = function (prtcl) {
        this.protocol = prtcl;
    }

    this.setHost = function (hst) {
        this.host = hst;
    }


    this.setHeader = function (hdr) {
        this.header = {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Authorization': hdr.headers.Authorization
            }
        }
    }


    //login, registry
    this.publicPost = function (path, data) {
        let url = this.protocol + '//' + this.host + path;
        return $http.post(url, data)
    }



    this.privateGet = function (path) {
        if (!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;
        return $http.get(url, this.header)
    }


    this.privatePost = function (path, data, file = false) {
        if (!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;
        return $http.post(url, data, this.header)
 
    }

    this.privatePut = function (path, data) {
        if (!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;
        return $http.put(url, data, this.header)
    }

    this.privateDelete = function (path) {
        if (!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;
        return $http.delete(url, this.header)
    }

    this.checkHeader = function () {
        if (!this.header) {
            $location.path('/');
            return false
        }
        return true
    }


    this.privatePostFile = function (path, data) {
        if (!this.checkHeader()) return;
        let url = this.protocol + '//' + this.host + path;

        let fileHeader = {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined,
                'Authorization': this.header.headers.Authorization
            }
        }
        return $http.post(url, data, fileHeader)


    }


    this.responseError = function (error) {
        if (error.status == 403) {
            console.log("access forbidden " + 403)
            $location.path('/');
        }
    }





});