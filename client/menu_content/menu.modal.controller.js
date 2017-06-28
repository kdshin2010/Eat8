(function() {
	'use strict';
	angular
	.module('menuApp')
	.controller('MenuModalCtrl', MenuModalCtrlFunction)


	function MenuModalCtrlFunction($scope, $location, MenuFactory, AuthService, OrdersFactory, $uibModalInstance, $rootScope, dataFromMenuCtrl) {
		var vm = this;
		vm.categeryIsEntered = false;
		vm.menuCategory = '';
		vm.item = {}
		vm.currentMenuItems = [];


		vm.enterCategory = function() {
			vm.isCategoryEntered = true;
		}


		//fix add append and update
		vm.addCategory = function() {
			vm.categoryIsEntered = true;
		}


		vm.addItem = function() {
			vm.currentMenuItems.push(vm.item);
			vm.item = {};
			console.log(vm.currentMenuItems.length);
		}


		vm.removeItem = function(item) {
			var indx = vm.currentMenuItems.indexOf(item);
			vm.currentMenuItems.splice(indx, 1);
		}
















		$scope.open = open;
		$scope.toggleCategory = toggleCategory
		$scope.addCategory = addCategory
		$scope.category = $scope.newCategory;
		$scope.addGroup = addGroup
		// $scope.addItems = addItems;
		$scope.username = AuthService.currentUser();
		$scope.selectedCategory;
		$scope.previewedCategory;
		$scope.editCategory = editCategory;
		$scope.updateItem = updateItem;
		$scope.addItemToTable = addItemToTable


		$scope.newCategory = {
			name: ''
		}

		$scope.updatedCategory = {
			name: ''
		}

		$scope.newItem = {
			name: '',
			price: '',
			description: ''
		}



		function updateItem() {
			//this is the updateItemId
			MenuFactory.updateItem({id: dataFromMenuCtrl._id, name: $scope.updateThisItem.name, price: $scope.updateThisItem.price})
			.then(function(data) {
				console.log(data)
				$rootScope.$broadcast('update')
				$uibModalInstance.dismiss();
			})
			.catch(function() {
				console.log('error updating Item')
			})
		}

		function previewCategory(category) {
			$scope.selectACategory = false;
			MenuFactory.previewCategory(category)
			.then(function(data){
				$scope.selectedCategory = data
				$scope.previewedCategory = data;
			})
			.catch(function() {
				console.log('error!')
			})
		}

		function addItemToTable() {
			MenuFactory.addItem({id: dataFromMenuCtrl, name: $scope.newItem.name, price: $scope.newItem.price})
			.then(function(data){
				$rootScope.$broadcast('update')
				$uibModalInstance.dismiss();
			})
			.catch(function(){
				console.log('error')
			})
		}



		// function addItem(){
		// 	MenuFactory.addItem({id: $scope.selectedCategory, name: $scope.newItem.name, price: $scope.newItem.price, description: $scope.newItem.description })
		// 	.then(function(data) {
		// 		console.log('this is my data!!')
		// 		console.log(data);
		// 		previewCategory($scope.selectedCategory);
		// 		$scope.newItem = {}
		// 	})
		// 	.catch(function(){
		// 		console.log('error!')
		// 	})
		// }
	

		function addGroup() {
			console.log($scope.previewedCategory)
			$rootScope.$broadcast('pushGroup', $scope.previewedCategory)
			console.log('here')
			$uibModalInstance.dismiss();
		}	

		function editCategory() {
			MenuFactory.editCategory(dataFromMenuCtrl, $scope.updatedCategory)
			.then(function(data){
				console.log(data)
				$rootScope.$broadcast('update');
				getMenuItems()
				$uibModalInstance.dismiss();

			})
			.catch(function(){
				console.log('erorr!');
			})
		}

		function addCategory() {
			console.log($scope.newCategory)
			console.log($scope.username)
			MenuFactory.addCategory($scope.newCategory, $scope.username.username)
			.then(function(data) {
				console.log(data._id);
				previewCategory(data)
			})
			.catch(function(error){
				console.log(error)
			})
			$scope.newCategory = {};
			toggleCategory();
		}

		function toggleCategory() {
			$scope.addCategoria = !$scope.addCategoria
		}
	}	

})()