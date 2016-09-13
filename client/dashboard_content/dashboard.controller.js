(function() {
	'use strict';
	angular
	.module('menuApp')
	.controller('DashboardCtrl', DashBoardCtrlFunction)

	function DashBoardCtrlFunction($scope, $location, MenuFactory, OrdersFactory) {
		$scope.hello = 'hello';
		$scope.layouts = layouts
		$scope.orders = orders


		function layouts() {
			$location.path('/view_restaur')
		}

		function orders() {
			$location.path('/orders')
		}
	}

	
})()