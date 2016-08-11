(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('WaitListFactory', WaitListFactoryFunction)

	function WaitListFactoryFunction($q, $http) {
		return {
			addGroup: addGroup
		}

		function addGroup(info) {
			console.log(info)
			var deferred = $q.defer()
			$http.post('/addGroup', {name: info.name, number: info.number, size: info.size, notified: info.notified})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(){
				deferred.reject()
			})
			return deferred.promise;
		}


	}
})()