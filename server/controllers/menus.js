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

menus.previewCategory = function(req, res) {
	console.log(req.body.id)
	MenuCategory.findOne({_id: req.body.id})
	.populate('items')
	.exec(function(err, results) {
		if(err) {
			console.log('error!')
		} else {
			res.json(results)
		}
	})
}

menus.removeCategory = function(req, res) {
	console.log(req.body.id)
	MenuCategory.remove({_id: req.body.id}, function(error) {
		if (error) {
			console.log('Could not remove Category')
		} else {
			console.log('successfully removed category!!')
			res.end();
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
		console.log(results)
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
						res.json(data);
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

menus.updateItem = function(req, res) {
	MenuItem.findByIdAndUpdate(req.body.id, {$set: { name: req.body.name, price: req.body.price}}, function(error, data) {
		if(error) {
			console.log('error')
		} else {
			res.json(data)
			res.end();
		}
	})
}

menus.removeItem = function(req, res) {
	MenuItem.remove({_id: req.body.id}, function(error) {
		if(error) {
			console.log('Could not remove Item')
		} else {
			console.log('successfull removed item!!!')
			res.end();
		}
	})
}


module.exports = menus