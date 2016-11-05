(function() {
	'use strict';

	angular
	.module('menuApp')
	.controller('OrdersCtrl', OrdersCtrlFunction)

	function OrdersCtrlFunction($scope, $location, MenuFactory, OrdersFactory, AuthService, $uibModal, $rootScope, RestaurFactory ) {

		/*
		add select table number variable to record table number
		get menu items to display on orders page
		*/
		var selected_table;
		$scope.items;
		$scope.testModal = testModal
		$scope.username = AuthService.currentUser();
		$scope.addOrderItem = addOrderItem,
		$scope.selectTable = selectTable;
		$scope.orderItems
		$scope.getOrderItems = getOrderItems;
		$scope.removeOrderItem = removeOrderItem;
		$scope.order_tables;
		$scope.submitted_orders;
		$scope.removeItemFromOrder = removeItemFromOrder;
		$scope.submitOrder = submitOrder;
		$scope.calculateTotal = calculateTotal;
		$scope.totalPrice;
		$scope.show_total = false;
		$scope.removeSubmittedOrder = removeSubmittedOrder;
		$scope.show_price;
		$scope.show_all_orders;
		$scope.getSalesTax = getSalesTax;
		$scope.salestax;
		$scope.animationsEnabled = true;
		$scope.submitted_orders;
		$scope.calculate = calculate
		$scope.didPay = didPay;
		$scope.paidOrders = [];

		//CHANGE THIS!!
		// $scope.getSalesTax = getSalesTax;
		getMenuItems();
		getSubmittedOrders();
		// setTimeout(function() { console.log($scope.salestax)}, 20000); 

		function calculate(table) {
			$scope.activeItem = x;
			var total = 0;
			for (var i=0; i<table.items.length; i++) {
				console.log(table.items[i].price)
				total += table.items[i].price
			}
			alert(total);
		}

	// only on the front end not yet on the back end	
	//fix on backend
		function didPay(order_id) {
			var idx = $scope.paidOrders.indexOf(order_id);
			OrdersFactory.didPay(order_id)
			.then(function(data){
				console.log(data.paid)
				if (data.paid === true && !(idx>-1)) {
					$scope.paidOrders.push(order_id)
					RestaurFactory.layoutSingle(data)
					// $rootScope.$emit('changeTable', data)
				} else {
					RestaurFactory.layoutSingle(data)

				}
			})
			.catch(function(){
				console.log('could not update to paid')
			})
			// index of -1 returns -1 if not found
			if (idx > -1) { // means toggling on to off
				$scope.paidOrders.splice(idx, 1);

			} 

			//make an API call to DB to update
		}


	
	
		$rootScope.$on('addSubmittedOrder', function(oringalFunction, data) {
			console.log('calling')
			console.log(data);
			$scope.$emit('hello', data.tabId)
			$scope.submitted_orders.push(data);
			console.log('should update order');
			getSubmittedOrders();
		})

		function testModal(x) {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../modal/modal_views/ordermodal.html',
				controller: 'OrderModalCtrl',
				scope: $scope,
				windowClass: 'orderModal',
				resolve: {
					dataFromMenuCtrl: function() {
						return 'hey'
					}
				}
			})
		}

		function getSalesTax() {
			$scope.show_all_orders = true;
			OrdersFactory.getSalesTax({zipcode: $scope.zipcode})
			.then(function(data) {
				$scope.salestax = data.combined_rate;
				console.log(data);
			})
			.catch(function() {
				console.log('error!')
			})
			$scope.zipcode = null
		}


		function calculateTotal(x) {
			$scope.activeItem = x;
			var totalPrice = 0;
			for (var i=0; i<x.items.length; i++) {
				totalPrice += x.items[i].price
			}
			$scope.orderTotal = totalPrice
		}


		//Submit Order Function  ----- Do not delete yet
		function getSubmittedOrders() {
			OrdersFactory.getSubmittedOrders()
			.then(function(data) {
				console.log('these are the submitted orders ')
				console.log(data)
				$scope.submitted_orders = data;
				// checksto see if order is paid then marks it as paid
				for (var i=0; i<data.length; i++) {
					if(data[i].paid === true) {
						$scope.paidOrders.push(data[i]._id)
					}
				}
				console.log('thbis is the submitted orders' + data)

			})
			.catch(function() {
				console.log('error!')
			})
		}

		function submitOrder(id) {
			OrdersFactory.submitOrder(id)
			.then(function(data) {
				console.log('successfully submitted order')
				$scope.order_tables = data;
				$location.path('/view_orders');
				$scope.show_order_tables = false;
			})
			.catch(function() {
				console.log('error getting submitted orders!')
			})
		}


		function getMenuItems() {
			MenuFactory.getMenuItems($scope.username.username)
			.then(function(data) {
				$scope.items = data;
				console.log(data);
				console.log('we are in the controller getMenuItems')
			})
			.catch(function(){
				console.log('error')
			})
		}


		function selectTable() {
			console.log('selecting table')
			selected_table = $scope.table_number;
			getOrderItems($scope.table_number)
			$scope.show_order_tables = true;
			OrdersFactory.addOrderTable($scope.table_number)
			.then(function(data) {
				getOrderItems();
			})
			.catch(function() {
				console.log("could not save table");
			})
		}

		function addOrderItem(x, menu) {
			console.log(menu.name)
			OrdersFactory.addOrderItem({table: selected_table, category: menu.name, name: x.name, price: x.price})
			.then(function() {
				console.log('success adding orderItem')
			})
			.catch(function(){
				console.log('error getting name!!')
			})
			getOrderItems(selected_table);

		}

		function getOrderItems(x) {
			OrdersFactory.getOrderItems(x) // ok
			.then(function(data) { //ok
				$scope.orderItems = data // ok
				console.log(data);
				console.log('got Order Items in controller!'); //ok
			})
			.catch(function(){
				console.log('could not get order items in controller!')
			})
		}

		function removeOrderItem(id) {
			console.log('removing order item!')
			OrdersFactory.removeOrderItem(id)
			.then(function() {
				console.log('successfully removed order item')
			})
			.catch(function() {
				console.log('could not remove order item!!')
			})

			getOrderItems(selected_table);

		}

		function removeItemFromOrder(id) {
			console.log('removing order item!')
			OrdersFactory.removeOrderItem(id)
			.then(function() {
				console.log('successfully removed order item')
			})
			.catch(function() {
				console.log('could not remove order item!!')
			})
			getSubmittedOrders();
		}

		function removeSubmittedOrder(id) {
			console.log('here')
			OrdersFactory.removeSubmittedOrder(id) 
			.then(function() {
				console.log('successfully removed submitted order')
			})
			.catch(function() {
				console.log('could not remove submitted order :(')
			})
			getSubmittedOrders();
		}
	}


})();