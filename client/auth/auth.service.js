(function() {
	'use strict'
	angular
	.module('menuApp')
	.factory('AuthService', AuthServiceFunction)

	//Inject here

	function AuthServiceFunction($http, $q) {
		var factory = {};
		var user = null;
		//variable for user info

		return {
			login: login,
			register: register
		}
	    function login(username, password) {
	      // create a new instance of deferred
	      var deferred = $q.defer();

	      // send a post request to the server
	      $http.post('/user/login', {username: username, password: password})
	        // handle success
	        .success(function (data, status) {
	          if(status === 200 && data.status){
	            user = true;
	            deferred.resolve(data);
	          } else {
	            user = false;
	            deferred.reject();
	          }
	        })
	        // handle error
	        .error(function (data) {
	          user = false;
	          deferred.reject();
	        });

	      // return promise object
	      return deferred.promise;
	    }
	    
	    function register(username, password) {
	      // create a new instance of deferred
	      var deferred = $q.defer();

	      // send a post request to the server
	      $http.post('/user/register', {username: username, password: password})
	        // handle success
	        .success(function (data, status) {
	          if(status === 200 && data.status){
	            console.log('success')
	            console.log(data)
	            deferred.resolve(data);
	          } else {
	            console.log('wrong!')
	            deferred.reject();
	          }
	        })
	        // handle error
	        .error(function (data) {
	          deferred.reject();
	        });
	      // return promise object
	      return deferred.promise;
	    }
	}

})();