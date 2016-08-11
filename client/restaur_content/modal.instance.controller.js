(function() {
	angular
		.module('menuApp')
		.controller('ModalInstanceCtrl', ModalInstanceCtrlFunction)

	function ModalInstanceCtrlFunction($scope, $uibModalInstance, $uibModal, items, RestaurFactory, $location) {
		$scope.cancel = cancel;
		$scope.ok = ok;
		var num_tables = [];
		add_tables();
		$scope.standardTables = standardTables

		function standardTables() {
			RestaurFactory.standardTables($scope.chosen_value)
			.then(function(data) {
				console.log(data)
				$uibModalInstance.close();
				$location.path('/menu')

			})
			.catch(function(){
				console.log('error adding tables')
			})
		}

		function add_tables() {
			for (var i=1; i<21; i++) {
				num_tables.push(i)
			}
			$scope.num_tables = num_tables
		}
	
		function ok() {
			RestaurFactory.sayHello();
			$scope.animations = false;
			$uibModalInstance.close();
			$location.path('/menu')
		}

		function cancel() {
			$uibModalInstance.dismiss('cancel')
		}
	}

})();