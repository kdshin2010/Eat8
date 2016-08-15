(function() {
	'use strict';
	
	angular
		.module('menuApp')
		.controller('WaitListCtrl', WaitlistCtrlFunction)

	function WaitlistCtrlFunction($scope, $uibModal, WaitListFactory) {
		var vm = this;
		//Waitlist Controller primarily used to open modal--> modal will have most functionality
		$scope.animationsEnabled = true;
		getGroups();
		$scope.removeGroup = removeGroup;
		$scope.notify = notify


		$scope.open = open;

		//signal from the waitlist.modal.conroller
		$scope.$on('pushGroup', function(origFunction, data) {
			vm.groups.push(data);
		});




		function getGroups() {
			console.log('getting groups')
			WaitListFactory.getGroups()
			.then(function(data){
				console.log('in the controller')
				console.log(data);
				vm.groups = data;
			})
			.catch(function(){
				console.log('error!')
			})
		}


		function open() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/waitlist_modal.html',
				controller: 'WaitListModalCtrl'
			})
		}

		function removeGroup(group_id) {
			WaitListFactory.removeGroup(group_id)
			.then(function(data){
				getGroups();
				console.log(data);

			})
			.catch(function() {
				console.log('error deleting groups ');
			})

		}

		function notify(number, size) {
			var formatted_number = "+1" + number;
			console.log(size)
			// include validations
			WaitListFactory.notify(formatted_number, size)
			.then(function(data) {
				console.log(data)
			})
			.catch(function() {
				console.log('error notifying clietn')
			})
		}
	}


})();