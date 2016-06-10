(function(){
	'use strict'
	angular
	.module('menuApp')
	.controller('AuthCtrl', AuthCtrlFunction)

	//Inject Parameters here

	function AuthCtrlFunction($scope, AuthService, $location) {
		$scope.test = 'hello'
		$scope.login = login;
		$scope.logout = logout;
		$scope.hello = 'kdshin2010'
		$scope.register = register
		$scope.username = AuthService.currentUser()
		$scope.isLoggedIn = AuthService.isLoggedIn();

		$scope.user = {
			username: "",
			password: ""
		}

		// function sendWelcomeEmail () {

		// 	AuthService.sendWelcomeEmail({name: $scope.user.username})
		// 	.then(function(data){
		// 		console.log(data);
		// 		console.log('successfully sent email')
		// 	})
		// 	.catch(function() {
		// 		console.log('erro senidng emial in the controller')
		// 	})
		// }


// <! --- YO HERE's the LOGIN INFO --->
		function register() {
			$scope.error = false;
			$scope.disabled = true;
			AuthService.register($scope.user)
			//success
			.then(function(data) {
				console.log(AuthService.currentUser())
				$location.path('/menu');
				console.log(data)
				$scope.diabled = false;
			})
			.catch(function() {
				$scope.error = true;
				$scope.errorMessage = "Invalid Name or Password";
				$scope.disabled = false;
				$scope.loginForm = {}
			})
		}
		function login() {
			$scope.error = false;
			$scope.disabled = true;
			AuthService.login($scope.user)
			//success
			.then(function(data) {
				$location.path('/menu');
				console.log(data)
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

		function logout() {
			AuthService.logout()
			console.log('logged out user!')
			$location.path('/login')
	
		}

	}
})()