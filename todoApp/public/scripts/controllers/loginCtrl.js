angular.module('myApp').controller('loginCtrl',
    function ($scope, autenticationService, $location) {

        autenticationService.ClearCredentials();


        $scope.gotoSignUp = function () {
            $location.path('signUp')

        }


        $scope.login = function (user) {
            autenticationService.login(user.email, user.password, function (response) {
                if (response.data.token) {
                    autenticationService.SetCredentials(response.data);
                    $location.path('/dashboard')
                } else {
                    $scope.error = "Invalid email or password!";
                    $scope.success = false;


                }
            })
        }



    })