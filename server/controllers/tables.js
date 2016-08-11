var mongoose = require('mongoose'),
	routes = require('../config/routes.js'),
	Table = mongoose.model('Table'),
	tables = {};


//add the first table
//lets just create a table with the tabId

tables.show = function(req, res) {
	Table.find({}, function(err, results) {
		if(err) {
			console.log('error getting tables')
		} else {
			res.json(results)
		}
	})
}

tables.deleteAll = function(req, res) {
	Table.remove({}, function(err) {
		if(err) {
			console.log(err)
		} else {
			console.log('successfully removed all tables')
		}
	})
}

tables.create = function(req, res) {
	console.log(req.body)
	var table = new Table({tabId: req.body.id, table_number: req.body.id_number, left:0, top: 0})
	table.save(function(err, data) {
		if(err) {
			console.log('err saving table')
		} else {
			console.log(data);
			res.json(data);
		}
	})
} 


tables.updateCoord = function(req, res) {
	console.log(req.body)
	Table.update({tabId: req.body.id}, { $set: { left: req.body.left, top: req.body.top}}, function(err, data) {
		if(err) {
			console.log(err)
		} else {
			console.log(data)
			res.json(data)
		}
	});
}

tables.delete = function(req, res) {
	console.log(req.body)
	Table.remove({tabId: req.body.id}, function(err){
		if(err) {
			console.log('err')
		} else {
			console.log('successfully deleted Table')
		}
	})
}

//custom value for tables


tables.standardTables = function(req, res) {
	var tables = [];
	for (var i=0; i<req.body.num; i++) {
		var table = new Table({tabId: 'tab'+i})
		tables.push(table)
	}
	console.log(tables)
	Table.insertMany(tables)
	.then(function(data) {
		res.json(data)
	})
	.catch(function() {
		console.log('error')
	})
}

// tables.standardTables = function(req, res) {
// 	console.log(req.body.num)
// 	for (var i=0; i<req.body.num; i++) {
// 		var table = new Table({tabId: 'tab'+i})
// 		table.save(function(err) {
// 			if(err) {
// 				console.log('error')
// 			} else {
// 				res.json(data)
// 			}
// 		});
// 	}
// }




//alternate way to update

/*

tables.updateCoord = function(req, res) {
	console.log(req.body)
	Table.findOne({tabId: req.body.id}, function(err, table) {
		if(err) {
			console.log('couldnt find table')
		} else {
			console.log('found');
			console.log(table)
			
		}
	})
}

*/







module.exports = tables;

