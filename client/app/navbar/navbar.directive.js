(function() {
	'use strict';
	angular
		.module('menuApp')
		.directive('ksNavbar', ksNavbarFunction)

		function ksNavbarFunction() {
			return {
				templateUrl: 'app/navbar/navbar.html',
				restrict: 'E',
				scope: {},
				controller: NavBarControllerFunction,
				controllerAs: 'vm'
			};
		}

		function NavBarControllerFunction($location, AuthService, $scope) {
			var vm = this;
			$scope.logout = logout;
			vm.isLoggedIn = AuthService.isLoggedIn;
			vm.username = AuthService.currentUser()

			function logout() {
				AuthService.logout()
				$location.path('/login')
			}
		}

})()