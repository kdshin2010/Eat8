(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('RestaurFactory', RestaurFactoryFunction)

		//Inject modules here

		function RestaurFactoryFunction($http, $q) {
			var factory = {}

			return {
				addIconId: addIconId

				//return values ot be passed to controllers here
			}

			function addIconId(tabId) {
				var deferred = $q.defer();
				$http.post('/addTable', {tabId: tabId})
				.success(function(data) {
					deferred.resolve();
				})
				.error(function(error) {
					console.log(error)
				})
				return deferred.promise;

			}
			

			//function values go here

		}
})()