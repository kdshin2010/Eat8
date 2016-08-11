(function() {
	'use strict';
	
	angular
		.module('menuApp')
		.controller('WaitlListModalCtrl', WaitlistModalCtrlFunction)

	function WaitlistModalCtrlFunction($scope, WaitListFactory) {
		$scope.groups = [];
		$scope.addGroup = addGroup
		$scope.group = {
			name: '',
			number: '',
			size: '',
			notification: ''
		}

		function addGroup() {
			WaitListFactory.addGroup({name: $scope.group.name, number: $scope.group.number, size: $scope.group.size, notified: $scope.group.notified})
			// .then(function(data) {
			// 	$scope.groups.push(data)
			// })
			// .catch(function(){
			// 	console.log('error adding group')
			// })
			// $scope.group = {};
		}


	}


})();