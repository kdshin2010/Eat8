(function() {
	'use strict';
	angular
	.module('menuApp')
	.controller('DashboardCtrl', DashBoardCtrlFunction)

	function DashBoardCtrlFunction($scope, $location, MenuFactory, OrdersFactory) {
		$scope.hello = 'hello';
		$scope.layouts = layouts
		$scope.orders = orders
		$scope.waitlist = waitlist


		function layouts() {
			$location.path('/view_restaur');
		}

		function orders() {
			$location.path('/productionOrders');
		}

		function waitlist() {
			$location.path('/waitlist');
		}

		function menu() {
			$location.path('/menu');
		}
	}

	
})()