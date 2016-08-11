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


		$scope.items = ['item1', 'item2', 'item3'];
		$scope.animationsEnabled = true;
		$scope.open = open;

		getTables();

		function open() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationsEnabled,
				templateUrl: '../views/modal_template.html',
				controller: 'ModalInstanceCtrl',
				resolve: {
					items: function() {
						return $scope.items
					}
				}
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
				tables = data
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