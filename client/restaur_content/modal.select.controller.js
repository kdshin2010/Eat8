(function() {
	angular
		.module('menuApp')
		.controller('ModalSelectCtrl', ModalSelectCtrlFunction)

	function ModalSelectCtrlFunction($scope, $uibModalInstance, $uibModal, RestaurFactory, $rootScope) {
		$scope. addSection = addSection
		function addSection() {
			console.log($scope.section)
			var selection = $scope.section;
			$rootScope.$broadcast('saySomething', selection);
			$uibModalInstance.dismiss()
		
		}

	}

})();