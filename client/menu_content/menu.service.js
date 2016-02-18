(function() {
	'use strict'
	angular
	.module('menuApp')
	.factory('MenuFactory', MenuFactoryFunction)

	// Inject Modules here?


	/*
		-create  

	*/

	function MenuFactoryFunction($http, $q) {
		var factory = {},
		categories;


		return {
			addCategory: addCategory,
			getCategories: getCategories,
			addItem: addItem,
			getMenuItems: getMenuItems
		}

		function addCategory(info) {
			console.log(info)
			var deferred = $q.defer()
			$http.post('/addCategory', {name: info.name})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(error) {
				deferred.reject()
			})
			return deferred.promise
		}

		function getCategories() {
			var deferred = $q.defer();
			$http.get('/getCategories')
			.success(function(data) {
				categories = data
				deferred.resolve(categories)
			})
			.error(function(error) {
				deferred.reject()
			})
			return deferred.promise
		}

		function addItem(info) {
			var deferred = $q.defer();
			$http.post('/additem', {id: info.id, name: info.name, price: info.price, description: info.description })
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(error) {
				deferred.reject()
			})
			return deferred.promise
		}

		function getMenuItems() {
			var deferred = $q.defer();
			$http.get('/getItems')
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(error) {
				deferred.reject()
			})
			return deferred.promise
		}
	}





})()