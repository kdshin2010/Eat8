(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('RestaurFactory', RestaurFactoryFunction)

		//Inject modules here

		function RestaurFactoryFunction($http, $q) {
			var factory = {},
			tables,
			dragRel = {
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
						//check if the last digit is empty to store single vs double digits
						if(lastdigit === " ") {
							selectedId = classAttr.substring(4,8);
						} else {
							selectedId = classAttr.substring(4,9)
						}

						var thisPos = $this.position(),
						x = thisPos.left,
						y = thisPos.top;
						updateCoord(selectedId, x, y);
						console.log($this);
					},
					start: function() {
						var $this = $(this),
						selectedId = $this.attr('class').substring(4,9);
						var $this = $(this);
					}

			}


			return {
				getTables: getTables,
				updateCoord: updateCoord,
				deleteIcon: deleteIcon,
				deleteTables: deleteTables,
				addIconInfo: addIconInfo,
				getIcons: getIcons,
				addContextMenu: addContextMenu,
				sayHello: sayHello,
				standardTables: standardTables,
				testLayout: testLayout,
				dragRel: dragRel,
				layoutTables2: layoutTables2,
				layoutSingle: layoutSingle,
				layoutTables: layoutTables //ivoke here so we can update tables throughout controllers
			}






			//return values ot be passed to controllers here


			//in the future consolidate this function to add tabId or ico id for now use two separate functions :);
			//change to add Marker




			function standardTables(num) {
				console.log(num)
				var deferred = $q.defer();
				$http.post('/standardTable', {num: num})
				.success(function(data) {
					console.log(data);
					deferred.resolve(data)
				})
				.error(function() {
					console.log('error adding tables')
				})
				return deferred.promise;
			}

			function sayHello() {
				console.log('hello!')
			}


	
			function addContextMenu(id) {
				$("#"+id).bind("contextmenu", function(event) {
					event.preventDefault();
					$(".custom-menu").finish().toggle(100).
					css({
						top: event.pageY + "px",
						left: event.pageX + "px"
					});
					$(".custom-menu li").data('yo', this)
				})
			}

		

			function addIconInfo(id, id_number) {
				var deferred = $q.defer();
				$http.post('/addIcon', {id: id, id_number: id_number})
				.success(function(data) {
					deferred.resolve(data);
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise;
			}


			function getIcons() {
				var deferred = $q.defer();
				$http.get('/getIcons')
				.success(function(data){
					deferred.resolve(data)
				})
				.error(function(){
					deferred.reject();
				})
				return deferred.promise
			}

			function deleteIcon(id) {
				console.log(id)
				var deferred = $q.defer();
				$http.post('/deleteIcon', {id:id})
				.success(function() {
					deferred.resolve()
				})
				.error(function() {
					deferred.reject()
				})
				return deferred.promise
			}

			//deleteing all tables
			function deleteTables() {
				var deferred = $q.defer()
				$http.post('/deleteTables')
				.success(function(data) {
					console.log(data)
					console.log('deleted tables')
					deferred.resolve()
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise
			}


			function layoutSingle(table) {
				$('.'+table.tabId).remove();
				$('#'+table.tabId).remove();
				// $('.'+table.tabId).removeAttr('id')
  				var table_number = table.table_number,
				tempId = table.tabId,
				top = table.top,
				left = table.left,
				// e = '<h3>Hello</h3>'
				f = "<div class=res class=" + tempId + "><span>watsup</span><br> Table "+ table_number + "></ul>/div>",
				e = "<div class=res id=" + tempId + "><ul class='icon_heading'<span>Table "+ table_number + "</span></ul><img class='icon_img " + table.status + "'></img></div>";
				console.log(e)
				$(e).appendTo('.restaur_container')
				// $("#"+tempId).addClass(tempId);
				addContextMenu(tempId);
				$('#'+tempId).draggable(dragRel);
				$('#'+tempId).css({top: top, left: left, position: 'absolute'});
			}

			function layoutTables() {
				$.each(tables, function(value) {
					console.log(tables[value])
					var table_number = tables[value]["table_number"],
					tempId = tables[value]["tabId"],
					top = tables[value]["top"],
					left = tables[value]["left"],
					e = "<div class=res id=" + tempId + "><ul class='icon_heading'<span>Table "+ table_number + "</span></ul><img class='icon_img " + tables[value].status + "'></img></div>";
					$(e).appendTo('.restaur_container');
					$("#"+tempId).addClass(tempId);
					// $('#'+tempId).addClass(tables[value].status)
					addContextMenu(tempId);
					$('.'+tempId).draggable(dragRel);
					$('.'+tempId).css({top: top, left: left, position: 'absolute'});
				})
			}

			function layoutTables2() {
				$.each(tables, function(value) {
					console.log(tables[value])
					var table_number = tables[value]["table_number"],
					tempId = tables[value]["tabId"],
					top = tables[value]["top"],
					left = tables[value]["left"],
					e = "<div class=res id=" + tempId + "><ul class='icon_heading'<span'>Table "+ table_number + "</span></ul><img class='icon_img " + tables[value].status + "'></img></div>";
					$(e).appendTo('.restaur_container2');
					$("#"+tempId).addClass(tempId);
					// $('#'+tempId).addClass(tables[value].status)
					addContextMenu(tempId);
					$('.'+tempId).draggable(dragRel);
					$('.'+tempId).css({top: top, left: left, position: 'absolute'});
				})
			}		
	

			//delete one table

			function getTables() {
				var deferred = $q.defer();
				$http.get('/getTables')
				.success(function(data) {
					console.log('calling getTables9)')
					console.log(data)
					deferred.resolve(data);
					tables = data;
				})
				.error(function(error){
					deferred.reject();
				})
				return deferred.promise
			}


			function updateCoord(id, left, top) {
				var deferred = $q.defer();
				console.log(left, top)
				$http.post('/updateCoord', {id: id, left: left, top: top})
				.success(function(data) {
					deferred.resolve(data)
				})
				.error(function() {
					deferred.reject();
				})
				return deferred.promise;
			}

			function testLayout() {
				console.log('calling')
				$('<h3>Hello</h3>').appendTo('.restaur_container')
			}


			//function values go here

		}

		//layout tables consolidate into one function possibly




		// function dragRel() {
		// 	return {
		// 		drag: function() {
		// 			var $this = $(this),
		// 			thisPos = $this.position(),
		// 			parentPos = $this.parent().position(),
		// 			x = thisPos.left,
		// 			y = thisPos.top;
		// 			$('#posX').text(x);
		// 			$("#posY").text(y);
		// 		},
		// 		stop: function() {
		// 			var $this = $(this),
		// 			selectedId,
		// 			classAttr = $this.attr('class'),
		// 			//to identify the id of the class attribute
		// 			lastdigit = $this.attr('class').substring(8,9);
		// 			console.log(classAttr);

		// 			//check if the last digit is empty
		// 			if(lastdigit === " ") {
		// 				selectedId = classAttr.substring(4,8);
		// 			} else {
		// 				selectedId = classAttr.substring(4,9)
		// 			}

		// 			var thisPos = $this.position(),
		// 			x = thisPos.Left,
		// 			y = thisPos.top;
		// 			updateCoord(selectedId, x, y);
		// 		},
		// 		start: function() {
		// 			var $this = $(this),
		// 			selectedId = $this.attr('class').substring(4,9);
		// 			var $this = $(this);
		// 		}
		// 	}
		// }
})()