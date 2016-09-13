(function() {
	'use strict';
	angular
	.module('menuApp')
	.controller('TestModalCtrl', TestModalCtrlFunction)

	function TestModalCtrlFunction($scope, $location, MenuFactory, OrdersFactory, $uibModal) {
		$scope.hello = 'hello';
		$scope.open = open


		function open() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../test/test.modal.view.html',
				controller: 'TestModalCtrl'
			})
		}


	}	

})()