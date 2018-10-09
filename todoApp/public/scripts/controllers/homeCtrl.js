angular.module('myApp').controller('homeCtrl',
    function ($scope, autenticationService, $location) {

        $scope.logError = false;
        autenticationService.ClearCredentials();

        $scope.login = function (user) {
            autenticationService.login(user.email, user.password, function (response) {
                if (response.data.token) {
                    console.log("log in successful")
                    $location.path('/dashboard')
                    autenticationService.SetCredentials(response.data);
                } else {

                    alert("Invalid login");
                }
            })
        }

        $scope.registry = function (data) {
            autenticationService.registry(data, function (response) {
                console.log(respose.data)
            })
        }

    })