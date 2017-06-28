(function() {
	'use strict';

	angular
	.module('menuApp')
	.run(['$anchorScroll', function($anchorScroll){
		$anchorScroll.yOffset = 50; // scroll by extra 50px
	}])
	.controller('MenuCtrl', MenuCtrl);

  	// MenuCtrl.$inject = ['$location', ];

	function MenuCtrl($scope, $location, MenuFactory, AuthService, $anchorScroll, $uibModal, $rootScope) {
		var vm = this;

		vm.openMenuModal;



		$scope.addCategory = addCategory;
		$scope.removeCategory = removeCategory
		$scope.showUpdate = showUpdate
		$scope.updateItem = updateItem
		$scope.removeItem = removeItem;
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
		// $scope.menuModal = menuModal;
		$scope.animationsEnabled = true;
		$scope.addCategoria = true;
		$scope.editModal = editModal;
		$scope.editItem = editItem;
		$scope.toggleCategory = toggleCategory;
		$scope.addItem = addItem
		// $scope.myController = myController
		// $scope.testJquery = testJquery
		var updateItemId;
		var category_nav;
		var map = Array.prototype.map;
		getMenuItems();
		


		//modal command to push groups into data
		// $scope.$on('addGroup', function(origFunction, data){
		// 	$scope.categories.push(data)
		// })

		$scope.$on('pushGroup', function(origFunction,data){
			$scope.items.push(data);

		})

		$scope.$on('update', function() {
			alert('updating!')
			//fix this and make sure it updates single index
			//data contains original category and updated category name
			getMenuItems();
		})

		//make this into one function

		//Add Menu Items
		// function menuModal(x) {
		// 	var modalInstance = $uibModal.open({
		// 		animation: $scope.animationsEnabled,
		// 		templateUrl: '../menu_content/menu.modal.html',
		// 		controller: 'MenuModalCtrl',
		// 		scope: $scope,
		// 		size: 'lg',
		// 		windowClass: 'myModal',
		// 		resolve: {
		// 			dataFromMenuCtrl: function() {
		// 				return null
		// 			}
		// 		}
		// 	})
		// }

		vm.openMenuModal = function(x) {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../modal/modal_views/menu_modal.html',
				controller: 'MenuModalCtrl',
				controllerAs: 'mmc',
				scope: $scope,
				size: 'lg',
				windowClass: 'myModal',
				resolve: {
					dataFromMenuCtrl: function() {
						return null
					}
				}
			})

		}

		function addItem(menu) {
			console.log('BELOW IS THE MENU')
			console.log(menu);
			alert('pening')
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/new.item.modal.html',
				controller: 'MenuModalCtrl',
				scope: $scope,
				size: 'sm',
				resolve: {
					dataFromMenuCtrl: function() {
						return menu
					}
				}
			})
		}

		

		function editModal(menu) {
			console.log(menu)
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/edit.category.modal.html',
				controller: 'MenuModalCtrl',
				scope: $scope,
				size: 'sm',
				resolve: {
					dataFromMenuCtrl: function() {
						return menu
					}
				}
			})
		}

		function editItem(item) {
			console.log(item)
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/edit.modal.html',
				controller: 'MenuModalCtrl',
				scope: $scope,
				size: 'sm',
				resolve: {
					dataFromMenuCtrl: function() {
						return item
					}
				}
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

		$scope.safeApply = function(fn) {
		  var phase = this.$root.$$phase;
		  if(phase == '$apply' || phase == '$digest') {
		    if(fn && (typeof(fn) === 'function')) {
		      fn();
		    }
		  } else {
		    this.$apply(fn);
		  }
		};

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


		function getMenuItems() {
			MenuFactory.getMenuItems($scope.username.username)
			.then(function(data) {
				console.log(data)
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
				getMenuItems();
		

			})
			.catch(function(){
				console.log('error!')
			})
		}

	}

})()