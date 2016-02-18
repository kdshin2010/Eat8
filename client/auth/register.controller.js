(function() {
	'use strict'

	angular
	.module('menuApp')
	.controller('RegisterCtrl', RegisterCtrlFunction)

	//Inject goes here

	function RegisterCtrlFunction($scope, $location, AuthService) {
		$scope.registerUser = registerUser


		function registerUser() {
			// initial values
			    $scope.error = false;
			    $scope.disabled = true;

			    // call register from service
			     AuthService.register($scope.newUser.username, $scope.newUser.password)
			        // handle success
			       .then(function(data) {
			          console.log('here and updated');
			          $scope.userInformation = data
			          console.log($scope.userInformation)
			          $location.path('/login');
			          $scope.disabled = false;
			          $scope.newUser = {};
			        })
			        // handle error
			        .catch(function () {
			          $scope.error = true;
			          $scope.errorMessage = "Something went wrong!";
			          $scope.disabled = false;
			          $scope.newUser = {};
			        });
			     };
			   }

})();