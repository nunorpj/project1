angular.module('myApp').controller('homeCtrl',
    function ($scope, autenticationService, $location) {

        $scope.logError = false;
        autenticationService.ClearCredentials();
        console.log($scope.logError)

        $scope.login = function (user) {
            autenticationService.login(user.email, user.password, function (response) {
                if (response.data.token) {
                    console.log("log in successful")
                    $location.path('/dashboard')
                    autenticationService.SetCredentials(response.data);
                } else {
                    $scope.logError = true;
                    $scope.saveSucess();
                    console.log($scope.logError)
                }
            })
        }

        $scope.registry = function (data) {
            autenticationService.registry(data, function (response) {
                console.log(respose.data)
            })
        }



        $scope.saveSucess = function() {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Users configs saved successfully!')
              .theme('success-toast')
                .hideDelay(3000)
                .position('bottom')
            );
          };
    })