(function() {
	'use strict';

	angular
	.module('menuApp')
	.controller('MenuCtrl', MenuCtrlFunction);

	function MenuCtrlFunction($scope, $location, MenuFactory) {
		$scope.addCategory = addCategory
		$scope.addItem = addItem
		$scope.categories;
		$scope.items

		getCategories();//get MenuCategores
		getMenuItems();

		function addCategory() {
			MenuFactory.addCategory($scope.newCategory)
			$scope.newCategory = {}
			getCategories();
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
			console.log($scope.selectedCategory)
			MenuFactory.addItem({id: $scope.selectedCategory, name: $scope.newItem.name, price: $scope.newItem.price, description: $scope.newItem.description })
			.then(function(data) {
				console.log(data)
				console.log('this is my data!!')
				$scope.items = data;
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

	}


})()