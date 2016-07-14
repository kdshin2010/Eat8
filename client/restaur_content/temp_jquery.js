
function restaur_icon(width, height, pos_top, pos_left) {
	this.width = 200 + 'px';
	this.height = 200 + 'px';
	this.pos_top = ''
	this.pos_left = ''
}


//jquery reference


		var array = [
			restaur_icon1 = {
				width: 200+'px';
				height: 200 = 'px';
			}
		]

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

		$(document).ready(function() {
			// e = "<div class='loadedDiv'>LoadedDiv</div>"
			// $(e).appendTo(".restaur_container");
			$(".restaur_container").css({"background-color": "grey"})
			$(".restaur_container").css({"height": 1250 + ''})


		})

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

		$(function() {
			var position = $('.')
		})

		$(function() {
			var restaur = $('.restaur_container').position();
			$('.restaur_container').append( ": left=" + position.left + ", top=" + position.top)
		})




		<script>
		$(function(){
		    var position = $('.target').position();
		    $('.target').append( ": left=" + position.left + ", top=" + position.top );
		 
		    var position_absolute = $('.target-absolute').position();
		    $('.target-absolute').append( ": left=" + position_absolute.left + ", top=" + position_absolute.top );
		});​
		</script>



//Jquery Notes


		// $(document).ready(function(e) {
		// 	e = "<div class='loadedDiv'>LoadedDiv</div>"
		// 	$(e).appendTo(".restaur_container");
		// 	// $(".restaur_container").css({"background-color": "red"})
		// })


//create object contstuctor restaur Icon


