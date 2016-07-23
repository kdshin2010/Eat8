var mongoose = require('mongoose'),
	routes = require('../config/routes.js'),
	Icon = mongoose.model('Icon'),
	icons = {};

icons.create = function(req, res) {
	console.log('here');
	var icon = new Icon({icoId: req.body.icoId, icon_number: req.body.icon_number, top:0, left:0});
	icon.save(function(err, data){
		if(err) {
			console.log(err)
		} else {
			res.json(data)
		}
	})
}

icons.show = function(req, res) {
	Icon.find({}, function(err, data){
		if(err) {
			console.log('error getting icons')
		} else {
			console.log(data)
			res.json(data)
		}
	})
}


icons.updateCoord = function(req, res) {
	console.log(req.body)
	Icon.update({icoId: req.body.id}, { $set: { left: req.body.left, top: req.body.top}}, function(err, data) {
		if(err) {
			console.log(err)
		} else {
			console.log('successfuly updated Icon good job Kyle!')
			console.log(data)
			res.json(data)
		}
	});
}




module.exports = icons;

