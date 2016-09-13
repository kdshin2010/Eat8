(function() {
	'use strict';
	angular
	.module('menuApp')
	.controller('MenuModalCtrl', MenuModalCtrlFunction)

	function MenuModalCtrlFunction($scope, $location, MenuFactory, AuthService, OrdersFactory, $uibModalInstance, $rootScope) {
		$scope.hello = 'abugga';
		$scope.open = open;
		$scope.toggleCategory = toggleCategory
		$scope.addCategory = addCategory
		$scope.category = $scope.newCategory;
		// $scope.addItems = addItems;
		$scope.addItem = addItem
		$scope.username = AuthService.currentUser();
		$scope.selectedCategory;
		$scope.previewedCategory
		$scope.items = [];

		$scope.newCategory = {
			name: ''
		}

		$scope.newItem = {
			name: '',
			price: '',
			description: ''
		}

		function previewCategory(category) {
			$scope.selectACategory = false;
			MenuFactory.previewCategory(category)
			.then(function(data){
				console.log('here!')
				console.log(data)
				$scope.selectedCategory = data
				console.log($scope.selectedCategory)
				$scope.previewedCategory = data;
				console.log('this is ')
			})
			.catch(function() {
				console.log('error!')
			})

		}

		function addItem(){
			MenuFactory.addItem({id: $scope.selectedCategory, name: $scope.newItem.name, price: $scope.newItem.price, description: $scope.newItem.description })
			.then(function(data) {
				console.log('this is my data!!')
				console.log(data);
				previewCategory($scope.selectedCategory);
				$scope.newItem = {}
			})
			.catch(function(){
				console.log('error!')
			})
		}	

		function addGroup() {
			console.log($scope.previewedCategory)
			$rootScope.$broadcast('addGroup' data)
			// $rootscope.$broadcast
		}	

		// function addItems() {
		// 	MenuFactory.addItems({categoryId: $scope.selectedCategory._id, items: $scope.items})
		// 	.then(function(data){
		// 		console.log(data);
		// 		$scope.items.push(data)
		// 	})
		// 	.catch(function() {
		// 		console.log('error')
		// 	})
		// }
		// 	console.log('here')



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
			// getCategories();
			// previewCategory($scope.newCategory)
			toggleCategory()
		}



		function toggleCategory() {
			$scope.addCategoria = !$scope.addCategoria
		}


		//function to add menu items

		//rootscope to pushGroup


	}	

})()