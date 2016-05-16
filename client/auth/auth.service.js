(function() {
	'use strict'
	angular
	.module('menuApp')
	.factory('AuthService', AuthServiceFunction)

	//Inject here

<<<<<<< HEAD
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
			// getProfile: getProfile,
			// getUsername: getUsername
		}


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


	    // function getUserStatus() {
	    // 	var deferred = $q.defer() 
	    // 		$http.get('/user/status')
	    // 		.success(function(data){e
	    // 			if(data.status) {
	    // 				user=true;
	    // 			} else {
	    // 				user = false;
	    // 			}
	    // 		})
	    // 		.error(function(data){
	    // 			user = false
	    // 		});
	    // 		return deferred.promise;
	    // 	}
	    // }


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
=======
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
>>>>>>> f259d9bcffa1ac48891a0fe4349193209093602d
	    }
	}

})();