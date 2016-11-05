(function(){
	'use strict';

	angular
		.module('menuApp')
		.controller('OrderModalCtrl', OrderModalCtrlFunction)


		function OrderModalCtrlFunction($scope, $uibModalInstance, RestaurFactory, $rootScope, MenuFactory, AuthService, OrdersFactory) {
			$scope.hello = 'hello';
			$scope.username = AuthService.currentUser();
			$scope.tables;
			$scope.changeView = changeView
			$scope.selectTable = selectTable;
			$scope.menuitems;
			$scope.addOrderItem
			$scope.addOrderItem = addOrderItem;
			$scope.submit_order = submit_order

			$scope.selected_table;

			getTables();
			getMenuItems();

			var map = Array.prototype.map;
			var each = Array.prototype.forEach
			console.log(map);


			function selectTable() {
				console.log($scope.selected_table)
				if ($scope.selected_table.status === "ordered" || $scope.selected_table.status === "paid") {
					alert('Aleady Submitted Order for Table')
				} else {
					getOrderItems($scope.selected_Table)
					changeView()
				}
			}
				
		
			function changeView() {
				$scope.test2 = !$scope.test2;
			}

			function addOrderItem(x, menu) {
				console.log(x);
				console.log(menu)
				OrdersFactory.addOrderItem({table: $scope.selected_table.table_number, category: menu.name, name: x.name, price: x.price})
				.then(function() {
					console.log('success adding orderItem')
				})
				.catch(function(){
					console.log('error getting name!!')
				})
				getOrderItems($scope.selected_table);
			}

			
			function getOrderItems(selected_table) {
				OrdersFactory.getOrderItems($scope.selected_table.table_number)
				.then(function(data) {
					$scope.orderItems = data;
					console.log(data)
				})
				.catch(function(){
					console.log('could not obtain the order items! :(')
				})

			}

			function getTables() {
				RestaurFactory.getTables()
				.then(function(data){
					console.log(data)
					$scope.tables = data;
				})
				.catch(function(){
					console.log('error getting tables!')
				})
			}

			function getMenuItems() {
				console.log('getting items now')
				console.log($scope.username)
				MenuFactory.getMenuItems($scope.username.username)
				.then(function(data) {
					$scope.menuitems = data;
					console.log(data)
				})
				.catch(function(){
					console.log('error getting items')
				})
			}

			function submit_order(table_number) {
				var currentItems = $scope.orderItems.items
				console.log(currentItems);
				var total = 0;
				currentItems.forEach(function(value) {
					total += value.price
				})
				total = (total * 1.0825).toFixed(2);
				OrdersFactory.submitOrder($scope.selected_table.table_number, total)
				.then(function(data) {
					$rootScope.$emit('addSubmittedOrder', data)
					console.log(data)
					$uibModalInstance.dismiss();
				})
				.catch(function() {
					console.log('error getting submitted orders!')
				})
			}

			//close UIB Modal Instance
			// //show table Legened on side
			// function submit_order() {
			// 	console.log($scope.orderItems)
			// 	OrdersFactory.submit($scope.selected_table)

			// 	$rootScope.$broadcast('addSubmittedOrder', $scope.orderItems)
			// 	$uibModalInstance.dismiss();


			// }

		}

})()