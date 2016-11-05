(function() {
	'use strict'
	angular
	.module('menuApp')
	.directive('ksRestaurLayout', ksRestaurLayoutFunction);

	function ksRestaurLayoutFunction() {
		return {
			templateUrl:'restaur_content/directive_view.html',
			restrict: 'EA',
			controller: RestaurController			
		}
	}

	function RestaurController($scope, RestaurFactory, $location, $uibModal, $log, $rootScope) {
		var tables,
		icons,
		dragRel = RestaurFactory.dragRel,
		tab;
		$scope.addTable = addTable;
		$scope.openAdd = openAdd;
		$scope.show_Layout = show_Layout;
		$scope.deleteTables = deleteTables
		$scope.items = ['item1', 'item2', 'item3'];
		$scope.animationsEnabled = true;
		$scope.open = open;
		$scope.testing = testing
		getTables();

		$scope.$on('hello', function(event, data){
			console.log(data);

		})
		getIcons();

		function addTable(e) {
			var table_number,
			tempId,
			Icon;
			if(tables.length === 0 ) {
				table_number = 1;
			} else {
				//faulty code
				table_number = (tables[tables.length - 1]["table_number"] + 1)
			}
			tempId = 'tab'+table_number;
			Icon = new tableIcon(tempId);
			e = "<div class=res id=" + tempId + "><span class='icon_heading'>Table " + table_number + "</span></ul><img class='icon_img ready'></img></div>";
			$(e).appendTo('.restaur_container')
			$("#"+tempId).addClass(tempId);
			RestaurFactory.addIconInfo(tempId, table_number)
			.then(function(data) {
				tables.push(data);
				//bind contextMenu with context menu function
			})
			.catch(function() {
				console.log('error!')
			})
			$("."+tempId).draggable(dragRel);
		}

	
		$rootScope.$on('addSubmittedOrder', function(event, data){
			console.log(data)
			console.log(data.tabId)
			console.log('is equal to')
			//remove the table
			RestaurFactory.layoutSingle(data)
			//append new one
		})

		$rootScope.$on('changeTable', function(event, data){
			console.log(event);
		})

		$scope.$on('addSection', function(origFunction, data) {
			var selection = data,
			icon_number,
			icoId
			function addIconInfo(icoId, icon_number) {
				RestaurFactory.addIconInfo(icoId, icon_number)
				.then(function(data) {
				})
				.catch(function(){
					console.log('error adding info')
				})				
			}
			//Bathroom, Bar, Entrance, Kitchen 4

			//make sure to give credit to icon sources
			switch(selection)
			{
				case 'Bar':
					icon_number = 1;
					icoId = 'ico' + icon_number
					var bar_icon = "<div class='bar' id=" + icoId + "><h4>Bar</h4><img class='icons' src='../app/images/bartender.png'></div>"
					$(bar_icon).appendTo('.restaur_container');
					RestaurFactory.addContextMenu(icoId);
					$("#"+icoId).addClass(icoId);
					$("."+icoId).draggable(dragRel);
					addIconInfo(icoId, icon_number)
					break;
				case 'Bathroom':
					icon_number = 2;
					icoId = 'ico' + icon_number
					var bathroom_icon = "<div class='bat' id=" + icoId + "><h4>Bathroom</h4><img class='icons' src='../app/images/toilet.png'></div>"
					$(bathroom_icon).appendTo('.restaur_container');
					RestaurFactory.addContextMenu(icoId);
					$("#"+icoId).addClass(icoId);
					$("."+icoId).draggable(dragRel);
					addIconInfo(icoId, icon_number)
					break;
				case 'Entrance':
					icon_number = 3;
					icoId = 'ico' + icon_number
					var enter_icon = "<div class='ent' id=" + icoId + "><h4>Entrance</h4><img class='icons' src='../app/images/entrance.png'></div>"
					$(enter_icon).appendTo('.restaur_container');
					RestaurFactory.addContextMenu(icoId);
					$("#"+icoId).addClass(icoId);
					$("."+icoId).draggable(dragRel);
					addIconInfo(icoId, icon_number)
					break;
				case 'Kitchen':
					icon_number = 4;
					icoId = 'ico' + icon_number
					var kit_icon = "<div class='kit' id=" + icoId + "><h4>Kitchen</h4><img class='icons' src='../app/images/kitchen.png'></div>"
					$(kit_icon).appendTo('.restaur_container');
					RestaurFactory.addContextMenu(icoId);
					$("#"+icoId).addClass(icoId);
					console.log(icoId + 'is the icoId')
					$("."+icoId).draggable(dragRel);
					addIconInfo(icoId, icon_number)
					break;
			}

		})



		function layoutIcons() {
			$.each(icons, function(value) {
				var icon_number = icons[value]["icon_number"],
				icoId = icons[value]["icoId"],
				top = icons[value]["top"],
				left = icons[value]["left"],
				i
				//Bar 1, Bathroom 2, Entrance 3, Kitchen 4
				// maybe add hostess area

				switch(icon_number) 
				{	
					case 1:
						i = "<div class='bar' id=" + icoId + "><h4>Bar</h4><img class='icons' src='../app/images/bartender.png'></div>";
						break;
					
					case 2:
						i = "<div class='bat' id=" + icoId + "><h4>Bathroom</h4><img class='icons' src='../app/images/toilet.png'></div>";
						break;
					
					case 3:
						i = "<div class='ent' id=" + icoId + "><h4>Entrance</h4><img class='icons' src='../app/images/entrance.png'></div>";
						break;
					
					case 4:
						i = "<div class='kit' id=" + icoId + "><h4>Kitchen</h4><img class='icons' src='../app/images/kitchen.png'></div>";
						break;
				}


				
				$(i).appendTo('.restaur_container');
				$("#"+icoId).addClass(icoId);
				$("#"+icoId).bind("contextmenu", function(event){
					event.preventDefault();
					$('.custom-menu').finish().toggle(100).
					css({
						top: event.pageY + "px",
						left: event.pageX + "px"
					})
					$(".custom-menu li").data('yo', this);
				})
				$('.'+icoId).draggable(dragRel);
				$('.'+icoId).css({top: top, left: left, positon: 'absolute'})
			})
		}

		function testing() {
			$('#tab8').css({"background-color": 'blue'})
		}


		function getIcons() {
			RestaurFactory.getIcons()
			.then(function(data){
				icons = data;
				layoutIcons();
			})
			.catch(function(){
				console.log('error getting icons')
			})
		}


		function open() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/modal_template.html',
				size: 'lg',
				controller: 'ModalInstanceCtrl',
	
			})
		}



		function show_Layout() {
			$scope.restaur_layout = true;
		}

		function openAdd() {
			var modalinstace = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/modal_select_view.html',
				controller: 'ModalSelectCtrl'
			})
		}



		function updateCoord(id, left, top) {
			RestaurFactory.updateCoord(id, left, top)
			.then(function(data) {
				tab = data;
			})
			.catch(function() {
				console.log('error getting id')
			})
		}

		function deleteTable(id) {
			RestaurFactory.deleteIcon(id)
			.then(function(){
				console.log('deleted table')
			})
			.catch(function() {
				console.log('could not delete table')
			})
		}

		function deleteTables() {
			//remove icons as well
			RestaurFactory.deleteTables()
			.then(function(){
				$.each(tables, function(value) {
					$("." + tables[value]["tabId"]).remove();
				})
				tables = [];
				console.log('deleted tables')
			})
			.catch(function() {
				console.log('error deletign tables')
			})
		}		


		function updateTables() {
			if (!tables) {
				RestaurFactory.getTables()
				.then(function(data) {
					console.log(data)
					tables = data
					console.log('updated tables')
				})
				.catch(function() {
					console.log('error getting tables')
				})

			}

		}

		function getTables() {
			RestaurFactory.getTables()
			.then(function(data) {
				tables = data;
				console.log(data)
				console.log('testing the service')
				RestaurFactory.layoutTables();
			})
			.catch(function() {
				console.log('error getting tables')
			})
		}

		function tableIcon(id, left, top) {
			this.id = id;
			this.left = left;
			this.top = top;
		}


		function deselect(e) {
			$('.pop').slideFadeToggle(function() {
				e.removeClass('selected')
			})
		}


		//on contact click
		function clickContact() {
			var $this = $(this);
			if($this.hasClass('selected')) {
				deselect($(this));
			} else {
				$(this).addClass('selected');
				$('.pop').slideFadeToggle();
			}

			return false;
		}


		$(".custom-menu li").click(function() {
			var tabid = ($(".custom-menu li").data('yo')).id
			switch($(this).attr("data-action")) {
				case "delete":
				$("."+tabid).remove();
				deleteTable(tabid);
				updateTables();
				break;
			}
			$(".custom-menu").hide(100);
		})


		$(document).bind("mousedown", function(e) {
			if(!$(e.target).parents(".custom-menu").length > 0) {
				$('.custom-menu').hide(100)
			}
		});
	}
})();


/*

	*/