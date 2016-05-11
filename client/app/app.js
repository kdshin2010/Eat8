(function(){
	'use strict'
	angular
	.module('menuApp', 
		['ngRoute'
		//other modules
		])
	.config(ConfigFunction)

//configFunction injection
	function ConfigFunction($routeProvider) {
		$routeProvider.when('/', {
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