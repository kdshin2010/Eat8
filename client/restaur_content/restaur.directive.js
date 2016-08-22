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
	function RestaurController($scope, RestaurFactory, $location, $uibModal, $log) {
		var tables,
		icons,
		tab;
		$scope.addTable = addTable;
		$scope.openAdd = openAdd;
		$scope.show_Layout = show_Layout
		$scope.addSection = addSection;
		$scope.deleteTables = deleteTables


		$scope.items = ['item1', 'item2', 'item3'];
		$scope.animationsEnabled = true;
		$scope.open = open;

		getTables();
		getIcons();

		$scope.$on('saySomething', function(origFunction, data) {
			var selection = data,
			icon_number,
			icoId
			function addIconInfo(icoId, icon_number) {
				RestaurFactory.addIconInfo(icoId, icon_number)
				.then(function(data) {
					console.log(data)
				})
				.catch(function(){
					console.log('error adding info')
				})				
			}
			switch(selection)
			{
				case 'Bathroom':
					icon_number = 2;
					icoId = 'ico' + icon_number
					var bathroom_icon = "<div class='bat' id=" + icoId + "><h4>Bathroom</h4><img class='bathroom_icon' src='../app/images/bathroom.jpg'></div>"
					$(bathroom_icon).appendTo('.restaur_container');
					RestaurFactory.addContextMenu(icoId);
					$("#"+icoId).addClass(icoId);
					$("."+icoId).draggable(dragRel);
					addIconInfo(icoId, icon_number)
					break;
				case 'Kitchen':
					alert('kitchen');
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
				console.log(icon_number)
				switch(icon_number) 
				{	
					case 3:
						i = "<div class='kit' id=" + icoId + "><h4>Kitchen</h4><img class = 'kitchen_icon' src='../app/images/kitchen.png'></div>";
						break
					case 2:
						i = "<div class='bat' id=" + icoId + "><h4>Bathroom</h4><img class='bathroom_icon' src='../app/images/bathroom.jpg'></div>";
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

		function getIcons() {
			RestaurFactory.getIcons()
			.then(function(data){
				icons = data;
				console.log(data)
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

		var dragRel = {
				drag: function() {
					var $this = $(this),
					thisPos = $this.position(),
					parentPos = $this.parent().position(),
					x = thisPos.left,
					y = thisPos.top;
					$('#posX').text(x);
					$("#posY").text(y);
				},
				stop: function() {
					//variable declarations $(this), selectedId, classAttr
					var $this = $(this),
					selectedId,
					classAttr = $this.attr('class'),

					//last digit to identify the id of the class attribute
					lastdigit = $this.attr('class').substring(8,9);
					console.log(classAttr);

					//check if the last digit is empty to store single vs double digits
					if(lastdigit === " ") {
						selectedId = classAttr.substring(4,8);
					} else {
						selectedId = classAttr.substring(4,9)
					}

					var thisPos = $this.position(),
					x = thisPos.left,
					y = thisPos.top;
					console.log(selectedId, x, y)
					updateCoord(selectedId, x, y);
				},
				start: function() {
					var $this = $(this),
					selectedId = $this.attr('class').substring(4,9);
					var $this = $(this);
				}
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

			RestaurFactory.deleteTables()
			.then(function(){
				//remove each table on teh DOM
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

		function layoutTables() {
			$.each(tables, function(value) {
				var table_number = tables[value]["table_number"],
				tempId = tables[value]["tabId"],
				top = tables[value]["top"],
				left = tables[value]["left"],
				e = "<div class=res id=" + tempId + "><ul class='icon_heading'<span>Table "+ table_number + "</span></ul><img class='icon_img'></img</div>";
				$(e).appendTo('.restaur_container');

				//possible consolidate to a function
				$("#"+tempId).addClass(tempId);
				RestaurFactory.addContextMenu(tempId);
				$('.'+tempId).draggable(dragRel);
				$('.'+tempId).css({top: top, left: left, position: 'absolute'});
			})
		}

		function updateTables() {
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


		function getTables() {
			RestaurFactory.getTables()
			.then(function(data) {
				tables = data;
				console.log(data)
				layoutTables();
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
			e = "<div class=res id=" + tempId + "><ul class='icon_heading'><span>Table " + table_number + "</span></ul><img class='icon_img'></img></div>";
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