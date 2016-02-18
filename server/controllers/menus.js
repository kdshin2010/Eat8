var mongoose = require('mongoose'),
	routes = require('../config/routes.js'),
	MenuCategory = mongoose.model('MenuCategory'),
	MenuItem = mongoose.model('MenuItem')
	menus = {};

menus.create = function(req, res) {
	var category = new MenuCategory({name: req.body.name})
	category.save(function(error, data) {
		if(error) {
			console.log(error)
		} else {
			console.log('Saved the data!')
			console.log(data)
		}
	})
}

menus.show = function(req, res) {
	MenuCategory.find({}, function(error, data) {
		if(error) {
			console.log('Could not retrieve data')
		} else {
			res.json(data)
		}
	})
}

menus.addItem = function(req, res) {
	MenuCategory.findOne({_id: req.body.id}, function(error, results) {
		var item = new MenuItem({name: req.body.name, price: req.body.price, description: req.body.description})
		item._category = results._id
		results.items.push(item)
		results.save(function(error) {
			if(error) {
				console.log('error saving to results!')
			} else {
				item.save(function(error, data) {
					if(error) {
						console.log('results saving item to items array')
					} else {
						console.log(data)
						console.log('success saving meu items to Category')
					}
				})
			}
		})
	})
}

menus.getItems = function(req, res) {
	MenuCategory.find()
	.populate('items')
	.exec(function(error, results) {
		if(error) {
			console.log('error!')
		} else {
			res.json(results)
			console.log(results)
		}
	})
}




module.exports = menus