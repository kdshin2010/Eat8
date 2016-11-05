(function() {
	angular
		.module('menuApp')
		.controller('ModalSelectCtrl', ModalSelectCtrlFunction)

	function ModalSelectCtrlFunction($scope, $uibModalInstance, $uibModal, RestaurFactory, $rootScope) {
		$scope. addSection = addSection
		function addSection() {
			console.log($scope.section)
			var selection = $scope.section;
			//change to emit
			$rootScope.$broadcast('addSection', selection);
			$uibModalInstance.dismiss()
		
		}

	}

})();

		function addSection() {
			alert('adding section')
			console.log('adding section')
			function addIconInfo(icoId, icon_number) {
				RestaurFactory.addIconInfo(icoId, icon_number)
				.then(function(data) {
					console.log(data)
				})
				.catch(function(){
					console.log('error adding info')
				})				
			}
			var bathroom_image = '../app/images/bathroom.jpg'
			var icon_number;
			var icoId;
			//add switch to see which is passed from modal
			icon_number = 1;
			icoId = 'ico' + icon_number;
			var bathroom_icon = "<div class='bat' id=" + icoId + "><h4>Bathroom</h4><img class='bathroom_icon' src='../app/images/bathroom.jpg'></div>"
			$(bathroom_icon).appendTo('.restaur_container');
			RestaurFactory.addContextMenu(icoId)
			$("#"+icoId).addClass(icoId)
			$("."+icoId).draggable(dragRel);
			addIconInfo(icoId, icon_number)
			alert('done')
		}