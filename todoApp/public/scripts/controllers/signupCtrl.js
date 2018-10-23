angular.module('myApp').controller('signUpCtrl',
    function ($scope, autenticationService, $location,$rootScope) {

        autenticationService.ClearCredentials();

        $scope.gotoLogIn= function(){
            $location.path('/')
        }

        $scope.registry = function (data) {

            if(!data.email || !data.password || !data.name)
                return 

            autenticationService.registry(data, function (response) {
                console.log(response)
                if(!response.data.sucess){
                    $scope.error="Email already in use!";
                }else{
                    $scope.error=false;
                    $location.path('/')
                    $rootScope.success="Accout created successfully!"
                }
            }).catch(err=>{
                $scope.error = err.data;
            })
        }



    })