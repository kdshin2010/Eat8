(function() {
	'use strict'

	angular
		.module('menuApp')
		.controller('RestaurCtrl', RestaurCtrlFunction)


	function RestaurCtrlFunction($scope, $location, RestaurFactory) {
		var tables;
		var tab;
		getTables();

		$scope.tables = tables
		$scope.getTables = getTables

		setTimeout(function() { console.log(tables)}, 12000);



		function getTables() {
			RestaurFactory.getTables() 
			.then(function(data) {
				tables = data;
				$scope.tables = data;
				console.log(tables)
			})
			.catch(function() {
				console.log('error getting tables')
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

	
//store the drag position into the object

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
			//need to store these icons with obj properties in tables array
			
			$("#addicon").click(function(e){
				var tempId = 'tab'+tables.length
				var iconId = "Table " + (tables.length+1)
				console.log(iconId)
				var Icon = new tableIcon(tempId);
				tables.push(Icon);
				e = "<div class=res id=" + tempId + " style='margin-top:100px'><p class='icon_heading'>" + iconId + "</p><img class='icon_img src='https://cdn1.iconfinder.com/data/icons/kitchen-4/500/Dine_dining_eat_eating_fork_knife_meal_meals_place-512.png'></img></div>"
				console.log(e);
				$(e).appendTo('.restaur_container')
				$("#"+tempId).addClass(tempId);
				RestaurFactory.addIconId(tempId)
				.then(function(data){
					console.log(data)
				})
				.catch(function() {
					console.log('error')
				})
				$("."+tempId).draggable(dragRel)
			;
			});

			$(".testButton").click(function(e) {
				$.each(tables, function(value){
					var addedid = tables[value]["tabId"],
					top = tables[value]["top"],
					left = tables[value]["left"];
					e = "<div id = " + addedid + "><img class='icon_img'></img></div>"
					console.log(e);
					$(e).appendTo('.restaur_container');
					$("#"+addedid).addClass('res ' + addedid);
					$('.'+addedid).draggable(dragRel);
					$('.'+addedid).css({top:top, left: left, position: "absolute"});
				})
			})




	

	




	}

})();

