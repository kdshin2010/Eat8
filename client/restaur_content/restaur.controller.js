(function() {
	'use strict'

	angular
		.module('menuApp')
		.controller('RestaurCtrl', RestaurCtrlFunction)

// RestaurCtrl.$inject = []

	function RestaurCtrlFunction($scope, $location, RestaurFactory) {

		var globalV;
		var globalY
		//shorter code for jquery

			var dragDoc = {
	         drag: function(){
			        var offset = $(this).position();
			        var xPos = position.left;
			        globalV = xPos
			        var yPos = position.top;
			         globalY = yPos
			         $('#posX').text('x: ' + xPos);
			         $('#posY').text('y: ' + yPos);
		         }
		  } 

		$("#testingJquery").click(function(){
			$("<div class='food_icon1'>").appendTo('.restaur_container');
			$(".food_icon1").draggable(dragDoc);
			var theId = '.food_icon' + 1
			$(theId).css({top: 200, "left": 300, position: 'relative', "background-color": "blue", })
		});


		$(".draggableP").css({top: 200, left: 200, position:'relative'});

		var dragDoc = {
	         drag: function(){
			        var offset = $(this).offset();
			        var xPos = offset.left;
			        globalV = xPos
			        var yPos = offset.top;
			         globalY = yPos
			         $('#posX').text('x: ' + xPos);
			         $('#posY').text('y: ' + yPos);
		         }
		  }

		$(function(){
			$(".food_icon").draggable(dragDoc)
		})



		// var myFunction = $("#foo").data("say");
		// myFunction(someParameter);






		//this controller will have mainly jquery functions to animate restauraunt layouts
		//need to store objects to store locations of the restaur icons;
		

	}

})();