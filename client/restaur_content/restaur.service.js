(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('RestaurFactory', RestaurFactoryFunction)

		//Inject modules here

		function RestaurFactoryFunction($http, $q) {
			var factory = {}

			return {
				testService: testService

				//return values ot be passed to controllers here
			}
			function testService() {
				alert('Restaur Service hooked up')
			}

			//function values go here

		}
})()