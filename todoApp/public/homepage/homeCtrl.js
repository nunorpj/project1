angular.module('myApp').controller('homeCtrl',
 function($scope,autenticationService,$location) {
   
   $scope.logError = false;
    autenticationService.ClearCredentials();

    $scope.login=function(email,pass){

        autenticationService.login(email,pass,function(response){
            if(response.data.token){
                console.log("log in successful")
                $location.path('/dashboard')
                autenticationService.SetCredentials(response.data);
            }else{

                alert("Invalid login");
            }
        })
    }
})