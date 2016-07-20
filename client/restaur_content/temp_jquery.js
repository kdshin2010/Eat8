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
					console.log('before adding data')
					console.log(data);
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
		}


function restaur_icon(width, height, pos_top, pos_left) {
	this.width = 200 + 'px';
	this.height = 200 + 'px';
	this.pos_top = ''
	this.pos_left = ''
}


$('.outfeedPosition').bind("contextmenu", function (e) {
    $('#contextMenu').css({
        top: e.pageY + 'px',
        left: e.pageX + 'px'
    }).show();

    //Store the item that was clicked 
    $("#contextMenu").data('originalElement', this);

    return false;
});


$('#ctxDelete').click(function () {
    var originalElement = $("#contextMenu").data('originalElement');
    alert('delete was clicked by ' + originalElement.id );
});


//jquery reference

// JAVASCRIPT (jQuery)

// Trigger action when the contexmenu is about to be shown
$(".rightClick").bind("contextmenu", function (event) {
    
    // Avoid the real one
    event.preventDefault();
    
    // Show contextmenu
    $(".custom-menu").finish().toggle(100).
    
    // In the right position (the mouse)
    css({
        top: event.pageY + "px",
        left: event.pageX + "px"
    });
});


// If the document is clicked somewhere
	$(document).bind("mousedown", function (e) {
	    
	    // If the clicked element is not the menu
	    if (!$(e.target).parents(".custom-menu").length > 0) {
	        
	        // Hide it
	        $(".custom-menu").hide(100);
	    }
	});




    $("#contextMenu").data('originalElement', this);

// If the menu element is clicked



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


