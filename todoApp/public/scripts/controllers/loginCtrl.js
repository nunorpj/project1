angular.module('myApp').controller('loginCtrl',
    function ($scope, autenticationService, $location,$rootScope) {

        autenticationService.ClearCredentials();
        
        console.log($rootScope.success)
        
        $scope.gotoSignUp = function () {
            $location.path('/signUp')

        }


        $scope.login = function (user) {
            autenticationService.login(user.email, user.password, function (response) {
                if (response.data.token) {
                    autenticationService.SetCredentials(response.data);
                    $location.path('/dashboard')
                }
            }).catch(err=>{
                console.log(err)
                $scope.error=err.data
            })
        }



    })