(function(){
	'use strict'
	angular
	.module('menuApp', 
		['ngRoute',
		'ngAnimate',
		'ui.bootstrap'
		//other modules
		])
	.config(ConfigFunction)
	.run(runFunction)

//configFunction injection
	function ConfigFunction($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: '../views/home.html',
			access: {restricted: false}
		})
		$routeProvider.when('/menu', {
			templateUrl: '../views/Menu.html',
			controller: 'MenuCtrl',
			access: {restricted: true}
		})
		$routeProvider.when('/login', {
			templateUrl: '../views/login.html',
			access: {restricted: false}
		})
		$routeProvider.when('/register', {
			templateUrl: '../views/register.html',
			access: {restricted: false}

		})
		$routeProvider.when('/view', {
			templateUrl: '../views/view4.html',
			controller: 'MenuCtrl',
			access: {restricted: true}
		})
		$routeProvider.when('/orders', {
			templateUrl: '../views/orders.html',
			access: {restricted: true}

		})
		$routeProvider.when('/view_orders', {
			templateUrl: '../views/view_orders.html',
			access: {restricted: true}

		})
		$routeProvider.when('/view_restaur', {
			templateUrl: '../views/view_restaur.html',
			access: {restricted: true}
		})
		$routeProvider.when('/testModal', {
			templateUrl: '../views/view2.html',
			access: {restricted: true}
		})
		$routeProvider.when('/waitlist', {
			templateUrl: '../views/waitlist.html',
			controller: 'WaitListCtrl',
			controllerAs: 'vm',
			access: {restricted: true}
		})
	}

	function runFunction($rootScope, $location, $route, AuthService) {
	  $rootScope.$on('$routeChangeStart',
	    function (event, next, current) {
	    if (next.access.restricted && !AuthService.isLoggedIn()) {
	      $location.path('/login');
	      $route.reload();
	    }
	  });
	}

})();




