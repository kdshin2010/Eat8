(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('RestaurFactory', RestaurFactoryFunction)

		//Inject modules here

		function RestaurFactoryFunction($http, $q) {
			var factory = {}


			return {
				addTableInfo: addTableInfo,
				getTables: getTables,
				updateCoord: updateCoord,
				deleteTable: deleteTable,
				deleteTables: deleteTables
				//return values ot be passed to controllers here
			}

			//in the future consolidate this function to add tabId or ico id for now use two separate functions :);
			//change to add Marker


			function addTableInfo(tabId, table_number) {
				var deferred = $q.defer();
				$http.post('/addTable', {tabId: tabId, table_number: table_number})
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise;
			}



			function deleteTables() {
				var deferred = $q.defer();
				$http.post('/deleteTables')
				.success(function() {
					deferred.resolve()
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise;
			}

			function deleteTable(tabId) {
				var deferred = $q.defer();
				$http.post('/deleteTable', {tabId: tabId})
				.success(function(data){
					deferred.resolve(data)
				})
				.error(function() {
					deferred.reject()
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