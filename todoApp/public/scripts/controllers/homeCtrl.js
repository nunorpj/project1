angular.module('myApp').controller('homeCtrl',
    function ($scope, autenticationService, $location) {

        autenticationService.ClearCredentials();

        $scope.login = function (user) {
            autenticationService.login(user.email, user.password, function (response) {
                if (response.data.token) {
                    $location.path('/dashboard')
                    autenticationService.SetCredentials(response.data);
                } else {
                    $scope.error="Invalid email or password!";
                    $scope.success=false;


                }
            })
        }

        $scope.registry = function (data) {
            autenticationService.registry(data, function (response) {
                console.log(response)
                if(!response.data.sucess){
                    $scope.error="Email already in use!";
                    $scope.success=false;  
                }else{
                    $scope.error=false;
                    $scope.success="Accout created successfully!"
                }



            })
        }



    })