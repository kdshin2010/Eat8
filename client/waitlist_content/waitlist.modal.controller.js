(function() {
	'use strict';
	
	angular
		.module('menuApp')
		.controller('WaitListModalCtrl', WaitListModalCtrl)

	function WaitListModalCtrl($scope, WaitListFactory, $uibModalInstance, $rootScope) {
		$scope.addGroup = addGroup

		$scope.group = {
			name: '',
			number: '',
			size: '',
			notification: ''
		}

		function addGroup() {
			console.log('adding group')
			WaitListFactory.addGroup({name: $scope.group.name, number: $scope.group.number, size: $scope.group.size, notification: $scope.group.notification})
			.then(function(data) {
				console.log('successly added group' + data );
				//enable Waitlist controller to handle data
				$rootScope.$broadcast('pushGroup', data);
 				$uibModalInstance.dismiss();
			})
			.catch(function(){
				console.log('error adding group')
			})
			$scope.group = {};
		}


	}

})();