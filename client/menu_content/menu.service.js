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
		categories

		return {
			addCategory: addCategory,
			getCategories: getCategories,
			addItem: addItem,
			getMenuItems: getMenuItems,
			removeCategory: removeCategory,
			obtainCategories: obtainCategories,
			updateItem: updateItem,
			removeItem: removeItem
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

		function obtainCategories(callback) {
			$http.get('/getCategories').success(function(data) {
				categories = data;
				callback(categories)
			})
		}


		function removeCategory(id, callback) {
			$http.post('/removeCategory', {id: id}).success(function(data){
				callback(data);
			})
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

		function addItem(info) {
			console.log(info.id + 'here is the id')
			var deferred = $q.defer();
			$http.post('/addItem', {id: info.id, name: info.name, price: info.price, description: info.description})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(error) {
				deferred.reject();
			})
			return deferred.promise
		}
		//update Item

		function updateItem(info) {
			var deferred = $q.defer();
			$http.post('/updateItem', {id: info.id, name: info.name, price: info.price, description: info.description})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function() {
				deferred.reject();
			})
			return deferred.promise
		}

		function removeItem(id) {
			var deferred = $q.defer();
			$http.post('/removeItem', {id: id})
			.success(function(data) {
				console.log(data + ' this is the data at the service factory we will see if this is necessary')
				deferred.resolve(data)
			})
			.error(function() {
				deferred.reject();
			})
			return deferred.promise;
		}



	}





})()