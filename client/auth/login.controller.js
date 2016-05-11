(function(){
	'use strict'
	angular
	.module('menuApp')
	.controller('LoginCtrl', LoginCtrlFunction)

	//Inject Parameters here

	function LoginCtrlFunction($scope, AuthService, $location) {
		$scope.test = 'hello'
		$scope.login = login;


// <! --- YO HERE's the LOGIN INFO --->

		function login() {
			$scope.error = false;
			$scope.disabled = true;
			AuthService.login($scope.user.username, $scope.user.password)
			//success
			.then(function(data) {
				$location.path('/menu');
				$scope.diabled = false;
				$scope.user = {}
			})
			.catch(function() {
				$scope.error = true;
				$scope.errorMessage = "Invalid Name or Password";
				$scope.disabled = false;
				$scope.loginForm = {}
			})
		}

	}
})()