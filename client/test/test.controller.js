(function() {
	'use strict';
	angular
	.module('menuApp')
	.controller('TestCtrl', TestCtrlFunction)

	function TestCtrlFunction($scope, $location, MenuFactory, OrdersFactory, $uibModal) {
		$scope.hello = 'hello';
		$scope.open = open;
		$scope.animationsEnabled = true;
		$scope.testngIf =  false;
		$scope.test = false;



		function open() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../test/test.modal.html',
				controller: 'TestModalCtrl',
				scope: $scope,
				size: 'lg',
				windowClass: 'myModal'
			})
		}

		function test() {
			alert('hello')
		}


	}

})()