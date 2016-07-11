(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('RestaurFactory', RestaurFactoryFunction)

		//Inject modules here

		function RestaurFactoryFunction($http, $q) {
			var factory = {}


			return {
				addIconId: addIconId,
				getTables: getTables,
				updateCoord: updateCoord
				//return values ot be passed to controllers here
			}

			function addIconId(tabId) {
				var deferred = $q.defer();
				$http.post('/addTable', {tabId: tabId})
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise;
			}

			function getTables() {
				var deferred = $q.defer();
				$http.get('/getTables')
				.success(function(data) {
					deferred.resolve(data)
				})
				.error(function(error){
					deferred.reject();
				})
				return deferred.promise
			}

			function updateCoord(id, left, top) {
				var deferred = $q.defer();
				$http.post('/updateCoord', {id: id, left: left, top: top})
				.success(function(data) {
					deferred.resolve(data)
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise;
			}
			//function values go here

		}
})()