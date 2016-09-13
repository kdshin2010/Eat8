(function() {
	'use strict'

	angular
		.module('menuApp')
		.controller('RestaurCtrl', RestaurCtrlFunction);


	function RestaurCtrlFunction($scope, $location, RestaurFactory) {
		var tables;
		var icons;
		var tab;
		getTables();
		getIcons();
	
		$scope.tables = tables;
		$scope.getTables = getTables;
		$scope.clearLayout = clearLayout;
		$scope.addSection = addSection;


		function layoutIcons() {
			$.each(icons, function(value) {
				var icon_number = icons[value]["icon_number"],
				icoId = icons[value]["icoId"],
				top = icons[value]["top"],
				left = icons[value]["left"],
				i
				switch(icon_number) 
				{	
					case 2:
						i = "<div class='kit' id=" + icoId + "><h4>Kitchen</h4><img class = 'kitchen_icon' src='../app/images/kitchen.png'></div>";
						break
					case 1:
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


		var bathroom_image = '../app/images/bathroom.jpg>'


	

		function addSection() {
			function addIconInfo(icoId, icon_number) {
				RestaurFactory.addIconInfo(icoId, icon_number)
				.then(function(data) {
					console.log(data)
				})
				.catch(function() {
					console.log('error adding icon!')
				})
			}
			var bathroom_image = '../app/images/bathroom.jpg>'
			var icon_number;
			var icoId;

			
			//consoldiate this code!
			switch($scope.section_icon)
			{
				case 'Bathroom':
					icon_number = 1;
					icoId = 'ico' + icon_number; // change 1 to include icon number;
					var bathroom_icon = "<div class='bat' id=" + icoId + "><h4>Bathroom</h4><img class='bathroom_icon' src='../app/images/bathroom.jpg'></div>"
					$(bathroom_icon).appendTo('.restaur_container');
					//so we can make them all draggable
					addContextMenu(icoId)
					$("#"+icoId).addClass(icoId);
					$("."+icoId).draggable(dragRel);
					addIconInfo(icoId, icon_number);
					break;
				case 'Kitchen': 
					icon_number = 5;
					icoId = 'ico' + icon_number;
					var kitchen_icon = "<div class='kit' id=" + icoId + "><h4>Kitchen</h4><img class = 'kitchen_icon' src='../app/images/kitchen.png'></div>";
					$(kitchen_icon).appendTo('.restaur_container');
					addContextMenu(icoId);
					//this can be a function
					$("#"+icoId).addClass(icoId)
					$('.'+icoId).draggable(dragRel);
					addIconInfo(icoId, icon_number)
					break;
			}
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





		function deleteTables() {
			RestaurFactory.deleteTables()
			.then(function() {
				console.log('successfully removed tables!')
			})
			.catch(function() {
				console.log(' error removing tables')
			})
		}


		function clearLayout() {
			$.each(tables, function(value) {
				var tabId = tables[value]["tabId"];
				$("."+ tabId).remove();
			})
			deleteTables();
			tables = [];
		}




		function getTables() {
			RestaurFactory.getTables() 
			.then(function(data) {
				console.log(data)
				tables = data;
				console.log(tables[tables.length-1])
				layOutTables();
			})
			.catch(function() {
				console.log('error getting tables')
			})
		}

		


		function layOutTables() {
			$.each(tables, function(value){
				var table_number = tables[value]["table_number"],
				tempId = tables[value]["tabId"],
				top = tables[value]["top"],
				left = tables[value]["left"],
				e = "<div class=res id=" + tempId + "><ul class='icon_heading'<span>Table "+ table_number + "</span></ul><img class='icon_img'></img</div>";
				$(e).appendTo('.restaur_container');

				//maybe consolidate to a funciton
				$("#"+tempId).addClass(tempId);
				RestaurFactory.addContextMenu(tempId)
				$('.'+tempId).draggable(dragRel);
				$('.'+tempId).css({top: top, left: left, position: 'absolute'});
			})

		}



		function deleteTable(tabId) {
			console.log(tables)
			for (var key in tables) {
				console.log(tables[key]["tabId"])
			}
			RestaurFactory.deleteTable(tabId)
			.then(function() {
				console.log('deleted')
			})
			.catch(function() {
				console.log('error deleting table!')
			})
		}

		$(".custom-menu li").click(function(){
			var tabid = ($(".custom-menu li").data('yo')).id

		    // This is the triggered action name
		    switch($(this).attr("data-action")) {
		        // A case for each action. Your actions here
		        case "complete_order": 
		        	alert("completing order for " + tabid); 
		        	break;
		        case "edit": 
		        	alert("editing for"); 
		        	break;
		        case "delete": 
		        	console.log(tables);
					$("."+tabid).remove();
		        	deleteTable(tabid);
		        	updateTables();
		        	console.log(tables)
		        	break;
		    }
		  
		    // Hide it AFTER the action was triggered
		    $(".custom-menu").hide(100);
		  });



		$(document).bind("mousedown", function (e) {
			    
			    // If the clicked element is not the menu
			if (!$(e.target).parents(".custom-menu").length > 0) {
			        
			        // Hide it
				$(".custom-menu").hide(100);
			}
		});


		function updateTables() {
			RestaurFactory.getTables()
			.then(function(data) {
				tables = data;
			})
			.catch(function() {
				console.log('error updatign tables!')
			})
		}


		//API call to get the selecetedId
		function updateCoord(id, left, top) {
			RestaurFactory.updateCoord(id, left, top)
			.then(function(data) {
				tab = data;
			})
			.catch(function() {
				console.log('error getting id')
			})
		}

		//again consolidate to one funciton

		

		var dragRel = {
			drag: function() {
				var $this = $(this);
				var thisPos = $this.position();
				var parentPos = $this.parent().position();
	   			var x = thisPos.left
            	var y = thisPos.top
            	$('#posX').text(x);
            	$('#posY').text(y);
            	//maybe add properties to the id;
			},
			stop: function() {
				//make an api call to store this in the db
				var $this = $(this);
				var selectedId
				var classAttr = $this.attr('class')
				console.log(classAttr)
				var lastdigit = $this.attr('class').substring(8,9)
				console.log($this.attr('class').substring(0,9));

				//check if last digit is empty 
				if (lastdigit === " ") {
					selectedId = classAttr.substring(4,8);
				} else {
					selectedId = classAttr.substring(4,9)
				}
 
				// $this.data("iconId")["id"] = selectedId
				var thisPos = $this.position();
				var x = thisPos.left;
				var y = thisPos.top;
				updateCoord(selectedId, x, y);

			},
			start: function() {
				var $this = $(this);
				var selectedId = $this.attr('class').substring(4,9);
				console.log("stargtin")
				var $this = $(this);
				console.log($this.data("iconId"))
			 }
		}

		 

		function tableIcon(id, left, top) {
			this.id = id;
			this.left = left;
			this.top = top

		};


			//Add Icon button adds table icons			
			$("#addicon").click(function(e){
				if (tables.length === 0) {
					var table_number = 1;
				} else {
					var table_number = (tables[tables.length-1]["table_number"]+1)
				}
				var tempId = 'tab'+ table_number;
				var Icon = new tableIcon(tempId);
				e = "<div class=res id=" + tempId + "><ul class='icon_heading'><span>Table " + table_number + "</span></ul><img class='icon_img'></img></div>"
				$(e).appendTo('.restaur_container');
				//this is so the class will be saved as a DOM Element
				$("#"+tempId).addClass(tempId);
				//saving both tabId and Table Number for the Element
				RestaurFactory.addTableInfo(tempId, table_number)
				.then(function(data){
					tables.push(data)
					//bind context menu
					$("#"+tempId).bind("contextmenu", function(event) {
						event.preventDefault();
						$(".custom-menu").finish().toggle(100).
						css({
							top: event.pageY + "px",
							left: event.pageX + "px"
						});
						$(".custom-menu li").data('yo', this);
					})
				})
				.catch(function() {
					console.log('error')
				})
				$("."+tempId).draggable(dragRel);
			});
		};
})();

