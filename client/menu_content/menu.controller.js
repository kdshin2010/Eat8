(function() {
	'use strict';

	angular
	.module('menuApp')
	.run(['$anchorScroll', function($anchorScroll){
		$anchorScroll.yOffset = 50; // scroll by extra 50px
	}])
	.controller('MenuCtrl', MenuCtrlFunction);

  	// MenuCtrl.$inject = ['$location', ];

	function MenuCtrlFunction($scope, $location, MenuFactory, AuthService, $anchorScroll, $uibModal) {
		$scope.addCategory = addCategory
		$scope.removeCategory = removeCategory
		$scope.showUpdate = showUpdate
		$scope.updateItem = updateItem
		$scope.removeItem = removeItem
		$scope.categories;
		$scope.items;
		// $scope.addItem = addItem;
		$scope.username = AuthService.currentUser();
		$scope.previewCategory = previewCategory;
		$scope.previewedCategory;
		$scope.selectedCategory;
		$scope.selectACategory;
		$scope.testAnchor = testAnchor;
		$scope.view_menu = view_menu;
		$scope.menuModal = menuModal;
		$scope.animationsEnabled = true;
		$scope.addCategoria = true;
		$scope.toggleCategory = toggleCategory
		// $scope.myController = myController
		// $scope.testJquery = testJquery
		var updateItemId;
		var category_nav;
		var map = Array.prototype.map;
		console.log(map);

		getCategories();
		getMenuItems();

		//modal command to push groups into data
		// $scope.$on('addGroup', function(origFunction, data){
		// 	$scope.categories.push(data)
		// })

		//Add Menu Items
		function menuModal() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../menu_content/menu.modal.html',
				controller: 'MenuModalCtrl',
				scope: $scope,
				size: 'lg',
				windowClass: 'myModal'
			})

		}

		function toggleCategory() {
			$scope.addCategoria = !$scope.addCategoria
		}


		//CLICK TO VIEW MENU
		function view_menu() {
			$location.path('view')
		}
		
		//TEST ANCHOR SCROLL
		function testAnchor(x) {
			var old = $location.hash();
			$location.hash('anchor'+x);
			$anchorScroll();
			$location.hash(old);
		}

		//When BUILDING MENU SHOWS CATEGORY ON THE RIGHT
		function previewCategory(category) {
			$scope.selectACategory = false;
			MenuFactory.previewCategory(category)
			.then(function(data){
				console.log('here!')
				console.log(data)
				$scope.selectedCategory = data
				console.log($scope.selectedCategory)
				$scope.previewedCategory = data;
			})
			.catch(function() {
				console.log('error!')
			})
		}

		//ADD CATEGORY
		function addCategory() {
			console.log($scope.newCategory)
			console.log($scope.username)
			MenuFactory.addCategory($scope.newCategory, $scope.username.username)
			.then(function(data) {
				console.log(data._id);
				previewCategory(data)
				alert(data);
			})
			.catch(function(error){
				console.log(error)
			})
			$scope.newCategory = {};
			// getCategories();
			// previewCategory($scope.newCategory)
		}



		//DELETE CATEGORY
		function removeCategory(x) {
			MenuFactory.removeCategory(x, function(data) {
				console.log('removed categories')
				$scope.categories = data;
			})
			getMenuItems();
		}

		//GET CATEGORIES ON SELCT
		function getCategories() {
			MenuFactory.getCategories($scope.username.username)
			.then(function(data) {
				$scope.categories = data;
				console.log('getting the names')
				category_nav = data.map(function(x) {
					return x.name
				})
				$scope.category_nav = category_nav


			})
			.catch(function() {
				console.log('error!!')
			})
		}

		//ADD ITEM
		// function addItem() {
		// 	console.log('here')
		// 	MenuFactory.addItem({id: $scope.selectedCategory, name: $scope.newItem.name, price: $scope.newItem.price, description: $scope.newItem.description })
		// 	.then(function(data) {
		// 		console.log('this is my data!!')
		// 		console.log(data);
		// 		previewCategory($scope.selectedCategory);
		// 	})
		// 	.catch(function(){
		// 		console.log('error!')
		// 	})
		// 	$scope.newItem = {};
		// }

		function getMenuItems() {
			MenuFactory.getMenuItems($scope.username.username)
			.then(function(data) {
				$scope.items = data;
				console.log(data);
			})
			.catch(function(){
				console.log('error')
			})
		}

		function showUpdate(id) {
			$scope.show_update = true;
			updateItemId = id;
				// other page has id
		}

		function updateItem() {
			//this is the updateItemId
			console.log(updateItemId);
			MenuFactory.updateItem({id: updateItemId, name: $scope.updateThisItem.name, price: $scope.updateThisItem.price})
			.then(function(data) {
				console.log(data)
				$scope.items = data;
			})
			.catch(function() {
				console.log('error updating Item')
			})
			$scope.updateThisItem = null
			if ($scope.selectedCategory) {
				previewCategory($scope.selectedCategory);
			} else {
				getMenuItems();
			}
		}

		function removeItem(id) {
			console.log(id)
			MenuFactory.removeItem(id)
			.then(function(data) {
				console.log('removed item')
				console.log(data + 'this is the remove Item data');
				//same function this checks if we are on '/menu' or '/view'
				if ($scope.selectedCategory) {
					previewCategory($scope.selectedCategory);
				} else {
					getMenuItems();
				}

			})
			.catch(function(){
				console.log('error!')
			})
		}

	}

})()