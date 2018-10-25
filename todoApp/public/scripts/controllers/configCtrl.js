'use strict';

angular.module('myApp')
    .controller('configController',
        function ($scope, $mdDialog, configService, $localStorage) {

            configService.getUser().then(response => {
                $scope.user = response.data;
            })

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.save = function (user) {

                console.log(user)
                if (!user) {
                    console.log("no data")
                    return

                } else {

                    configService.updateUser(user).then( response => {
                        if (response.data.name) {
                            $localStorage.currentUser.user = response.data.name;
                            $scope.username = $localStorage.currentUser.user;
                            $scope.toastShow("User's configs saved")
                            $scope.$parent.username = $localStorage.currentUser.user;

                        }
                    }).catch(err => {
                        $scope.toastShow(err.data)

                    })
                }


                $mdDialog.hide(user);
            };
        }
    )