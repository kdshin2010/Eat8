(function(){
	'use strict'
	angular
	.module('menuApp', 
		['ngRoute'
		//other modules
		])
	.config(ConfigFunction)
<<<<<<< HEAD
	.run(runFunction)
=======
>>>>>>> f259d9bcffa1ac48891a0fe4349193209093602d

//configFunction injection
	function ConfigFunction($routeProvider) {
		$routeProvider.when('/', {
<<<<<<< HEAD
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
			templateUrl: '../views/view2.html',
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
	}

	function runFunction($rootScope, $location, $route, AuthService) {
	  $rootScope.$on('$routeChangeStart',
	    function (event, next, current) {
	    if (next.access.restricted && !AuthService.isLoggedIn()) {
	      $location.path('/login');
	      $route.reload();
	    }
	  });

;}


})();




=======
			templateUrl: '../views/home.html'
		})
		$routeProvider.when('/menu', {
			templateUrl: '../views/Menu.html',
			controller: 'MenuCtrl'
		})
		$routeProvider.when('/login', {
			templateUrl: '../views/login.html'
		})
		$routeProvider.when('/register', {
			templateUrl: '../views/register.html'
		})
		$routeProvider.when('/view', {
			templateUrl: '../views/view2.html'
		})
		$routeProvider.when('/orders', {
			templateUrl: '../views/orders.html'
		})
		$routeProvider.when('/view_orders', {
			templateUrl: '../views/view_orders.html'
		})
	}
})()
>>>>>>> f259d9bcffa1ac48891a0fe4349193209093602d
