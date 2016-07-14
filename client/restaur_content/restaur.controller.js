(function() {
	'use strict'

	angular
		.module('menuApp')
		.controller('RestaurCtrl', RestaurCtrlFunction);


	function RestaurCtrlFunction($scope, $location, RestaurFactory) {
		var tables;
		var tab;
		getTables();

		$scope.tables = tables
		$scope.getTables = getTables
		$scope.layOutTables = layOutTables

		setTimeout(function() { console.log(tables)}, 12000);



		function layOutTables() {
			$.each(tables, function(value){
				var table_number = tables[value]["table_number"],
				tempId = tables[value]["tabId"],
				top = tables[value]["top"],
				left = tables[value]["left"],
				e = "<div class=res id=" + tempId + "><ul class='icon_heading'<span>Table "+ table_number + "</span></ul><img class='icon_img'></img</div>";
				$(e).appendTo('.restaur_container');
				$("#"+tempId).addClass(tempId);
				$('.'+tempId).draggable(dragRel);
				$('.'+tempId).css({top: top, left: left, position: 'absolute'});
			})
		}


		function getTables() {
			RestaurFactory.getTables() 
			.then(function(data) {
				console.log(data)
				tables = data;
				layOutTables();
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
				var table_number = (tables.length+1)
				var tempId = 'tab'+ table_number;
				var Icon = new tableIcon(tempId);
				e = "<div class=res id=" + tempId + "><ul class='icon_heading'><span>Table " + table_number + "</span></ul><img class='icon_img'></img></div>"
				$(e).appendTo('.restaur_container');

				//this is so the class will be saved as a DOM Element
				$("#"+tempId).addClass(tempId);

				//saving both tabId and Table Number for the Element
				RestaurFactory.addTableInfo(tempId, table_number)
				.then(function(data){
					console.log('before adding data')
					console.log(data);
					tables.push(data)
					console.log(tables);

				})
				.catch(function() {
					console.log('error')
				})
				$("."+tempId).draggable(dragRel);
			});






	

	




	}

})();

