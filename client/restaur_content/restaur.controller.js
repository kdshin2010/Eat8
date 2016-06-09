(function() {
	'use strict'

	angular
		.module('menuApp')
		.controller('RestaurCtrl', RestaurCtrlFunction)

// RestaurCtrl.$inject = []

	function RestaurCtrlFunction($scope, $location, RestaurFactory) {
		alert('restaur ctrl is hooked up');
		RestaurFactory.testService();
		//this controller will have mainly jquery functions to animate restauraunt layouts
		//need to store objects to store locations of the restaur icons;
		

	}

})();