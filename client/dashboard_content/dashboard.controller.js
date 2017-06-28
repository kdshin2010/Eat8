(function() {
	'use strict';
	angular
	.module('menuApp')
	.controller('DashboardCtrl', DashBoardCtrlFunction)

	function DashBoardCtrlFunction($scope, $location, MenuFactory, OrdersFactory) {
		var vm = this;

		vm.layouts = layouts;
		vm.orders = orders;
		vm.waitList = waitList;
		vm.menu = menu;


		function layouts() {
			$location.path('/view_restaur');
		}

		function orders() {
			$location.path('/productionOrders');
		}

		function waitList() {
			$location.path('/waitlist');
		}

		function menu() {
			$location.path('/menu');
		}
	}

	
})()