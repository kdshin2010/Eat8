(function() {
	'use strict'

	angular
	.module('menuApp')
	.factory('OrdersFactory', OrdersFactoryFunction)

	function OrdersFactoryFunction($http, $q) {
		var factory = {};

		return {
			addOrderItem: addOrderItem,
			addOrderTable: addOrderTable,
			getOrderItems: getOrderItems,
			removeOrderItem: removeOrderItem,
			getOrderTables: getOrderTables,
			submitOrder: submitOrder,
			getSubmittedOrders: getSubmittedOrders,
			removeSubmittedOrder: removeSubmittedOrder,
			taxJarTest: taxJarTest
		}

		function taxJarTest() {
			var deferred = $q.defer();
			$http.get('/taxjartest')
			.success(function(data){
				deferred.resolve(data);
			})
			.error(function(){
				deferred.reject();
			})
			return deferred.promise;
		}


	

		//Testing Delete after
		function getOrderTables(callback) {
			$http.get('/getOrderTables').success(function(data) {
				console.log(data)
				callback(data)
			})
		}



		//Retrieve submitted orders

		function getSubmittedOrders() {
			var deferred = $q.defer()
			$http.get('/getSubmittedOrders')
			.success(function(data) {
				console.log('in the factory getting submitted Orders')
				deferred.resolve(data)
			})
			.error(function() {
				console.log('in the factory and could not get submitted Orders')
				deferred.reject();
			})
			return deferred.promise;
		}


		//Updating order Items

		function submitOrder(id) {
			var deferred = $q.defer();
			$http.post('/submitOrder', {id: id})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function() {
				console.log('could not update order Item')
				deferred.reject()
			})
			return deferred.promise;
		}


		function getOrderItems (info) {
			console.log(info + 'this is the first line of getOrderItems') //ok
			var deferred = $q.defer(); //ok
 			$http.get('/getOrderItems/' + info) //ok
			.success(function(data) {
				console.log(data + ' got the order Items in the factory') //ok
				deferred.resolve(data) //ok
			})
			.error(function() {
				console.log('could not get order items from the service');
			})
			return deferred.promise
		}

		function addOrderTable (tablenumber){
		 	var deferred = $q.defer();
		 	$http.post('/selectTable', {table: tablenumber})
		 	.success(function(data) {
		 		if (data === 'Table Exists!') {
		 			console.log('Send Error')
		 			deferred.resolve(data)
		 		}
		 		deferred.resolve()
		 	})
		 	.error(function(error) {
		 		console.log(error + 'this is the error message')
		 		console.log('error!!!')
		 	})
		 	return deferred.promise;
		}

		function addOrderItem (info) {
			var deferred = $q.defer();
			console.log(info)
			$http.post('/addOrderItem', {table: info.table, category: info.category, name: info.name, price: info.price})
			.success(function() {
				deferred.resolve()
			})
			.error(function() {
				deferred.reject();
			})
			return deferred.promise;
		}

		function removeOrderItem(id) {
			var deferred = $q.defer();
			console.log(id + 'this is the id in the service')
			$http.post('/removeOrderItem', {id: id})
			.success(function() {
				deferred.resolve()
			})
			.catch(function() {
				deferred.reject();
			})
			return deferred.promise;
		}

		function removeSubmittedOrder(id) {
			var deferred = $q.defer();
			$http.post('/removeSubmittedOrder', {id: id})
			.success(function(){
				deferred.resolve(data)
				console.log('data in the service for removing submitted order')
			})
			.catch(function() {
				deferred.reject()
			}) 
			return deferred.promise;
		}
	}
})()

