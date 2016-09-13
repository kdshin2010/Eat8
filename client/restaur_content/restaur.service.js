(function() {
	'use strict';
	angular
		.module('menuApp')
		.factory('RestaurFactory', RestaurFactoryFunction)

		//Inject modules here

		function RestaurFactoryFunction($http, $q) {
			var factory = {}


			return {
				getTables: getTables,
				updateCoord: updateCoord,
				deleteIcon: deleteIcon,
				deleteTables: deleteTables,
				addIconInfo: addIconInfo,
				getIcons: getIcons,
				addContextMenu: addContextMenu,
				sayHello: sayHello,
				standardTables: standardTables
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

			//delete one table

			function getTables() {
				var deferred = $q.defer();
				$http.get('/getTables')
				.success(function(data) {
					deferred.resolve(data)
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