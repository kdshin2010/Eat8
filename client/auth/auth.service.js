(function() {
	'use strict'
	angular
	.module('menuApp')
	.factory('AuthService', AuthServiceFunction)

	//Inject here

	function AuthServiceFunction($http, $q, $window) {
		var factory = {};
		var user = null;
		var userinfo;
		//variable for user info

		return {
			currentUser: currentUser,
			saveToken: saveToken,
			getToken: getToken,
			register: register,
			login: login,
			logout: logout,
			isLoggedIn: isLoggedIn
		}
		// function sendWelcomeEmail(info) {
		// 	var deferred = $q.defer()
		// 	$http.post('/sendWelcomeEmail', info)
		// 	.success(function(data) {
		// 		console.log('resolving data to ctrl');
		// 		deferred.resolve(data)
		// 	})
		// 	.error(function(){
		// 		console.log('error!')
		// 	})
		// 	return deferred.promise;

		// }


		function saveToken(token) {
			$window.localStorage['mean-token'] = token;
		}

		function getToken() {
			return $window.localStorage['mean-token'];
		}

		function register(info) {
			var deferred = $q.defer();
			$http.post('/register', info)
			.success(function(data) {
				deferred.resolve(saveToken(data.token))
			})
			.error(function(){
				console.log('error!')
			})
			return deferred.promise
		}

		function login(info) {
			var deferred = $q.defer();
			$http.post('/login', info)
			.success(function(data) {
				deferred.resolve(saveToken(data.token))
			})
			.error(function(){
				console.log('error!')
			})
			return deferred.promise		}


		function saveToken(token) {
			$window.localStorage['mean-token'] = token;
		}

		function logout() {
			$window.localStorage.removeItem('mean-token')
		}

		function currentUser() {
		    if(isLoggedIn()){
		    var token = getToken();
		    var payload = token.split('.')[1];
		    payload = $window.atob(payload);
		    payload = JSON.parse(payload);
		    return {
		        username : payload.username
		      };
		    }
		  };

		function isLoggedIn() {
				var token = getToken();
				var payload;
				if(token) {
					payload = token.split('.')[1];
					payload = $window.atob(payload);
					payload = JSON.parse(payload);
					return payload.exp > Date.now() / 1000;
				} else {
					return false;
				}
				
			}



		function getUserStatus() {
		  return $http.get('/status')
		  // handle success
		  .success(function (data) {
		    if(data.status){
		      user = true;
		    } else {
		      user = false;
		    }
		  })
		  // handle error
		  .error(function (data) {
		    user = false;
		  });
		}
	    function sendUserInfo() {
	    	return userinfo;
	    }
	}

})();