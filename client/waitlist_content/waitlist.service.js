(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('WaitListFactory', WaitListFactoryFunction)

	function WaitListFactoryFunction($q, $http) {
		return {
			addGroup: addGroup,
			getGroups: getGroups,
			removeGroup: removeGroup,
			notify: notify
		}

		function removeGroup(group_id) {
			var deferred = $q.defer();
			$http.post('/removeGroup', {id: group_id})
			.success(function(data){
				console.log('in the service');
				deferred.resolve(data)
			})
			.error(function() {
				deferred.reject()
			})
			return deferred.promise;
		}


		function getGroups() {
			console.log('gettiung groups')
			var deferred= $q.defer();
			$http.get('/getGroups')
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(){
				console.log('error getting groups ')
				deferred.reject();
			})
			return deferred.promise;
		}

		function addGroup(info) {
			console.log(info)
			var deferred = $q.defer();
			$http.post('/addGroup', {name: info.name, number: info.number, size: info.size, notified: info.notified})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(){
				deferred.reject()
			})
			return deferred.promise;
		}

		function removeGroup(group_id) {
			console.log(group_id)
			var deferred = $q.defer();
			$http.post('/removeGroup', {id: group_id})
			.success(function(data){
				console.log(data)
				console.log('in the service')
				deferred.resolve(data);
			})
			.error(function(){
				console.log('error removing group');
				deferred.reject()
			})
			return deferred.promise
		}

		function notify(number, size, group) {
			console.log(group)
			var deferred = $q.defer();
			$http.post('/notify', {number: number, size: size})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function() {
				deferred.reject();
			})
			return deferred.promise
		}


	}
})()