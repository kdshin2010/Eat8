var mongoose = require('mongoose'),
	routes = require('../config/routes.js'),
	Icon = mongoose.model('Icon'),
	icons = {};

icons.create = function(req, res) {
	console.log('here');
	console.log(req.body.id)
	var icon = new Icon({icoId: req.body.id, icon_number: req.body.id_number, top:0, left:0});
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
	console.log(req.body.id)
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

icons.delete = function(req, res) {
	console.log(req.body.id)
	Icon.remove({icoId: req.body.id}, function(err) {
		if(err) {
			console.log('err!')
		} else {
			console.log('successfully removed ICON')
		}
	})
}



module.exports = icons;

