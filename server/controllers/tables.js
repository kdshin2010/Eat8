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
	var table = new Table({tabId: req.body.tabId})
	table.save(function(err, data) {
		if(err) {
			console.log(' err saving table')
		} else {
			console.log(data);
			res.json(data);
		}
	})
} 




module.exports = tables;

