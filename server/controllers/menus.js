var mongoose = require('mongoose'),
	routes = require('../config/routes.js'),
	MenuCategory = mongoose.model('MenuCategory'),
	MenuItem = mongoose.model('MenuItem')
	menus = {};


menus.create = function(req, res) {
	console.log(req.body)
	var category = new MenuCategory({name: req.body.name, user: req.body.user})
	category.save(function(error, data) {
		if(error) {
			console.log(error)
		} else {
			console.log('Saved the data!')
			res.json(data)
		}
	})
}


menus.previewCategory = function(req, res) {
	console.log(req.body.id)
	MenuCategory.findOne({_id: req.body.id})
	.populate('items')
	.exec(function(err, results) {
		if(err) {
			console.log(err)
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
	console.log('here')
	console.log(req.body)
	console.log('GETTING CATEGORIES')
	MenuCategory.find({user: req.body.username})
	.populate('items')
	.exec(function(err, result){
		if(err) {
			console.log(err)
		} else {
			res.json(result)
		}
	})
}

menus.addItems = function(req, res) {
	MenuCategory.findOne({_id: req.body.categoryId}, function(err, result){
		if(err){
			console.log('error!')
		} else {
			MenuItem.insertMany(req.body.items)
			.then(function(data){
				console.log('success')
				console.log(data)
				var newitems = data.map(function(value){
					value._category = result._id;
					console.log(value)
					return value;
				})
				console.log(newitems)
				console.log(newitems)
				result.items.push(newitems)
				result.save(function(err, result2) {
					if(err) {
						console.log('error')
					} else {
						console.log('success!')
						console.log(result2)
						res.json(result2)
					}
				})
			})
			.catch(function(){
				console.log('error!')
			})
		}
	})
}


menus.editCategory = function(req, res) {
	MenuCategory.findById(req.body.id, function(err, result){
		if(err) return handelError(err);
		result.name = req.body.name;
		result.save(function(err, updatedResult) {
			if(err) return handleError(err);
			console.log(updatedResult)
			res.json(updatedResult)
		})
	})
}



// menus.addItems = function(req, res) {
// 	var items = req.body.items
// 	MenuCategory.findOne({_id: req.body.categoryId}, function(error, result){
// 		if(error) {
// 			console.log(error)
// 		} else {
// 		}
// 	}
// 				items.map(function(value) {

// 				value._category = result._id
// 				return value
// 			});
// 			console.log(newItems);
// 			result.items.push(newItems)
// 			console.log('new result above')
// 			console.log(result)
// 			// console.log(result)
// 			result.save(function(err, result) {
// 				if(err){
// 					console.log(err)
// 				} else {
// 					MenuItem.insertMany(newItems)
// 					.then(function(data){
// 						console.log('successfuly!')
// 						res.json(result)
// 						console.log(result)
// 					})
// 					.catch(function(){
// 						console.log('error')
// 					})		
// 				}
// 			})
// 		}
// 	})
// }

menus.addItem = function(req, res) {
	console.log(req.body)
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
	MenuCategory.find({user: req.body.username})
	.populate('items')
	.exec(function(err, result){
		if(err) {
			console.log(err)
		} else {
			res.json(result)
		}
	})

	// .populate('items')
	// .exec(function(error, results) {
	// 	if(error) {
	// 		console.log(error)
	// 	} else {
	// 		console.log('got the')
	// 		res.json(results)
	// 		console.log(results)
	// 	}
	// })
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