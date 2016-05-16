(function() {
	'use strict';

	angular
	.module('menuApp')
	.controller('MenuCtrl', MenuCtrlFunction);

  	// MenuCtrl.$inject = ['$location', ];


	function MenuCtrlFunction($scope, $location, MenuFactory, AuthService) {
		$scope.addCategory = addCategory
		$scope.addItem = addItem
		$scope.removeCategory = removeCategory
		$scope.showUpdate = showUpdate
		$scope.updateItem = updateItem
		$scope.removeItem = removeItem
		$scope.categories;
		$scope.items
		$scope.username = AuthService.currentUser();
		


		var updateItemId;


		getCategories();//get MenuCategores
		getMenuItems();

		function showUserName() {

		}

		function addCategory() {
			MenuFactory.addCategory($scope.newCategory)
			$scope.newCategory = {}
			getCategories();
		}

		function removeCategory(x) {
			MenuFactory.removeCategory(x, function(data) {
				$scope.categories = data;
			})
			getMenuItems();

		}

		function getCategories() {
			MenuFactory.getCategories()
			.then(function(data) {
				$scope.categories = data;
				console.log(data)
			})
			.catch(function() {
				console.log('error!!')
			})
		}

		function addItem() {
			console.log('here')
			MenuFactory.addItem({id: $scope.selectedCategory, name: $scope.newItem.name, price: $scope.newItem.price, description: $scope.newItem.description })
			.then(function(data) {
				console.log('this is my data!!')
				console.log(data)
			})
			.catch(function(){
				console.log('error!')
			})
			$scope.newItem = {}
		}

		function getMenuItems() {
			MenuFactory.getMenuItems()
			.then(function(data) {
				$scope.items = data;
				console.log(data)
			})
			.catch(function(){
				console.log('error')
			})
		}

		function showUpdate(id) {
			$scope.show_update = true;
			updateItemId = id
			console.log(updateItemId)
		}

		function updateItem() {
			console.log(updateItemId)
			MenuFactory.updateItem({id: updateItemId, name: $scope.newItem.name, price: $scope.newItem.price})
			.then(function(data) {
				console.log(data)
				$scope.items = data;
			})
			.catch(function() {
				console.log('error updating Item')
			})
			$scope.newItem = {}
			getMenuItems();
		}

		function removeItem(id) {
			MenuFactory.removeItem(id)
			.then(function(data) {
				console.log(data + 'this is the remove Item data')
			})
			.catch(function(){
				console.log('error!')
			})
			getMenuItems();
		}

	}

})()