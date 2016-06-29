(function() {
	'use strict'

	angular
		.module('menuApp')
		.controller('RestaurCtrl', RestaurCtrlFunction)


	function RestaurCtrlFunction($scope, $location, RestaurFactory) {

		var globalV;
		var globalY;

	
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
				var selectedId = $this.attr('class').substring(4,9);
				$this.data("iconId")["id"] = selectedId
				var thisPos = $this.position();
				var x = thisPos.left;
				var y = thisPos.top

				//this substring is the class we assigned to it
				for (var i in tables) {
					if (tables[i].id = selectedId) {
						tables[i].left = x;
						tables[i].right = y;
					}

				}
				console.log(tables)

			},

			start: function() {
				console.log("stargtin")
				var $this = $(this);
				console.log($this.data("iconId"))
			 }
		}


			//constructor for CSS properties
			function tableIcon(id, left, top) {
				this.id = id;
				this.left = left;
				this.top = top
			};




			var tables = [];

			//Add Icon button adds table icons
			//need to store these icons with obj properties in tables array
			//
			$("#addicon").click(function(e){
				var tempId = 'tab'+tables.length
				//tables.length is the id we give to the table
				var Icon = new tableIcon(tempId);
				tables.push(Icon);
				e = "<div class=res></div>";
				$(e).appendTo('.restaur_container');
				$(".res").addClass(tempId);
				//HTTP request to add table Icon Id
				//class name and property will match
				//maybe tempid will not work we will see
				RestaurFactory.addIconId(tempId)
				.then(function(data){
					console.log(data)
				})
				.catch(function() {
					console.log('error')
				})
				
				$("."+tempId).data("iconId", new tableIcon)
				$("."+tempId).draggable(dragRel);
			});

			setTimeout(function() {console.log(tables)},3000)		

	}

})();



//Jquery Notes


		// $("#addicon").click(function(e) {
			// 	var newIcon = new tableIcon();
			// 	tables.push(newIcon);
			// 	//ok position properties work :)
			// 	e = "<div class=res>3</div>";

			// 	$(e).appendTo('.restaur_container');

   //              // $(e).data("tableicon", newIcon);
			// 	// $(".res").attr('id', 'ab2');
			// 	// $("#ab2").css({"width": 20 + "px"})
			// 	$(".res").draggable(dragRel)
			// 	/*  Setting a New Property to this Image */
			// 	// $("#o1").css({'background-color': 'blue'});
			// });


		// $(document).ready(function(e) {
		// 	e = "<div class='loadedDiv'>LoadedDiv</div>"
		// 	$(e).appendTo(".restaur_container");
		// 	// $(".restaur_container").css({"background-color": "red"})
		// })