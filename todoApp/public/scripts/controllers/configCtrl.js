'use strict';

angular.module('myApp')
    .controller('configController',
        function ($scope, $mdDialog, configService, $localStorage, $window, $timeout) {

            configService.getUser().then(response => {
                $scope.user = response.data;
                $scope.pic = window.location.protocol + "//" + window.location.host + "/api/user/img/" + $scope.user.email;
            })




            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function (user) {

                if (!user) {
                    console.log("no data")
                    return

                } else {

                    let fd = new FormData()
                    fd.append("name",user.name);
                    fd.append("email",user.email);
                    fd.append("password",user.password);
                    fd.append("notifications",user.notifications);
                    fd.append("sendingHour",user.sendingHour);


                    configService.updateUser(fd).then(response => {
                        if (response.data.name) {
                            $localStorage.currentUser.user = response.data.name;
                            $scope.username = $localStorage.currentUser.user;
                            $scope.toastShow("User's configs saved")
                            $scope.$parent.username = $localStorage.currentUser.user;
                            $mdDialog.hide(user);

                        }
                    }).catch(err => {
                        $scope.toastShow(err.data)

                    })
                }


            };



            $scope.uploadFile = function () {

                this.protocol = window.location.protocol;
                this.host = window.location.host;


                if($scope.myFile==undefined)
                    return

                var file = $scope.myFile;


                var fd = new FormData();
                fd.append('file', file);


                configService.updatePic(fd)
                    .then( ()=> {
                        $scope.pic = window.location.protocol + "//" + window.location.host + "/api/user/img/" + $scope.user.email + "?cb=" + new Date().toString();
                    })
                    .catch( (e)=> {
                        console.log("error!!");
                        console.log(e);

                    });


            };





        }



    )