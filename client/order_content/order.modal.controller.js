(function(){
	'use strict';

	angular
		.module('menuApp')
		.controller('OrderModalCtrl', OrderModalCtrlFunction)


		function OrderModalCtrlFunction($scope, RestaurFactory, MenuFactory, AuthService, OrdersFactory) {
			$scope.hello = 'hello';
			$scope.username = AuthService.currentUser();
			$scope.tables;
			$scope.changeView = changeView
			$scope.selectTable = selectTable;
			$scope.menuitems;
			$scope.addOrderItem
			$scope.addOrderItem = addOrderItem

			$scope.selected_table;

			getTables();
			getMenuItems();


			function selectTable() {
				getOrderItems($scope.selected_table)
				changeView()

			}
				
		
			function changeView() {
				$scope.test2 = !$scope.test2;
			}

			function addOrderItem(x, menu) {
				console.log(x);
				console.log(menu)
				console.log($scope.selected_table)
				console.log('here!')
				OrdersFactory.addOrderItem({table: $scope.selected_table, category: menu.name, name: x.name, price: x.price})
				.then(function() {
					console.log('success adding orderItem')
				})
				.catch(function(){
					console.log('error getting name!!')
				})
				getOrderItems($scope.selected_table);
			}

			
			function getOrderItems(selected_table) {
				OrdersFactory.getOrderItems($scope.selected_table)
				.then(function(data) {
					console.log('*******&&&&&&&&****')
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
		}

})()