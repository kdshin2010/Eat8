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

		//Seat Individual on the table on the waitlist

		$scope.notify = notify;
		vm.groups;

		$scope.toggle = function toggle(name) {}

		$scope.selection = [];


		$scope.toggleSelection = toggleSelection;
		$scope.show_picture = show_picture


		function show_picture() {
			console.log($scope.profile_picture)
		}

		$scope.open = open;

		//signal from the waitlist.modal.conroller
		$scope.$on('pushGroup', function(origFunction, data) {
			vm.groups.push(data);
		});


		function toggleSelection(groupId) {
			var indx = $scope.selection.indexOf(groupId);
			if (indx> -1) {
				$scope.selection.splice(indx, 1)
			}

			else {
				$scope.selection.push(groupId)
			}
		}

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
			console.log('opening')
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

		function notify(number, size, group) {
			var formatted_number = "+1" + number;open
			console.log(group);
			//make sure you notify only once
			for (var i=0; i<$scope.selection.length; i++) {
				if ($scope.selection[i] === group._id) {
					var confirmation = confirm('You Already Notified are you sure you want to send a text again?')
					if (confirmation) {
						alert('aweesome wroks');
					}
				}
			}
			$scope.toggleSelection(group._id)
			group.notifed = true;
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