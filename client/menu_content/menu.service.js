(function() {
	'use strict'
	angular
	.module('menuApp')
	.factory('MenuFactory', MenuFactoryFunction)
	
	function MenuFactoryFunction($http, $q) {
		var factory = {},
		categories

		return {
			addCategory: addCategory,
			getCategories: getCategories,
			getMenuItems: getMenuItems,
			removeCategory: removeCategory,
			obtainCategories: obtainCategories,
			updateItem: updateItem,
			removeItem: removeItem,
			previewCategory: previewCategory,
			addItems: addItems,
			addItem: addItem,
			editCategory: editCategory
		}

		function editCategory(menuitems, updateCategory) {
			var deferred = $q.defer();
			$http.post('/editCategory', {id: menuitems._id, name:updateCategory.name, price: updateCategory.price})
			.success(function(data) {
				deferred.resolve(data);
			})
			.error(function(){
				deferred.reject();
			})
			return deferred.promise;
		}

		function previewCategory(category){
			var deferred = $q.defer()
			$http.post('/previewCategory', {id: category})
			.success(function(data) {
				console.log('success and resolving the data')
				deferred.resolve(data);
			})
			.error(function(){
				console.log('in the service and could not get the previewd categories');
			})
			return deferred.promise;
		}

		function addCategory(newCategory, user) {
			console.log(user)
			var deferred = $q.defer()
			$http.post('/addCategory', {name: newCategory.name, user: user })
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(error) {
				console.log(error);
				deferred.reject();
			})
			return deferred.promise
		}

		function getCategories(username) {
			var deferred = $q.defer();
			console.log(username)
			$http.post('/getCategories', {username: username})
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

		function getMenuItems(username) {
			var deferred = $q.defer();
			$http.post('/getItems', {username: username})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(error) {
				deferred.reject()
			})
			return deferred.promise
		}



		function addItem(info) {
			console.log(info)
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

		function addItems(info) {
			console.log('here as we go')
			$http.post('/addItems', {categoryId: info.categoryId, items: info.items})
			.success(function(data) {
				deferred.resolve(data)
			})
			.catch(function() {
				deferred.reject()
			})
		}

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