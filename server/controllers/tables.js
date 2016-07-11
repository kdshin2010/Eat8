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

tables.create = function(req, res) {
	console.log(req.body)
	var table = new Table({tabId: req.body.tabId, left:0, top: 0})
	table.save(function(err, data) {
		if(err) {
			console.log(' err saving table')
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

