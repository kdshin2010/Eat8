(function() {
	'use strict';
	
	angular
		.module('menuApp')
		.controller('WaitListCtrl', WaitlistCtrlFunction)

	function WaitlistCtrlFunction($scope, $uibModal ) {
		//Waitlist Controller primarily used to open modal--> modal will have most functionality
		$scope.hello = 'hello';
		$scope.animationsEnabled = true;
		$scope.open = open


		function open() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/waitlist_modal.html',
				controller: 'WaitlListModalCtrl',
				size: 'sm'
			})
		}

	}


})();