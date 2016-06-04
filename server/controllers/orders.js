var mongoose = require('mongoose'),
	routes = require('../config/routes.js')
	OrderTable = mongoose.model('OrderTable'),
	taxjar = require("taxjar")("bd500e410729da592779e6eee4cd951e")
	OrderItem = mongoose.model('OrderItem'),
	orders = {};




orders.getRates = function(req, res){
	console.log(req.body)
	taxjar.ratesForLocation(req.body.zipcode).then(function(data) {
		console.log(data.rate);
		res.json(data.rate);
	})
}

orders.selectTable = function(req, res) {
	OrderTable.find({table: req.body.table}, function(err, results) {
		if(results.length) {
			console.log('could not save, table already exists!!')
			res.send('Table Exists!')
		} else {
			var table = new OrderTable({table: req.body.table})
			table.save(function(err) {
				if(err) {
					console.log('error!')
				} else {
					console.log('successfully saved table!!!, goood job!!!')
				}
			})
		}
	})

}
orders.addOrderItem = function(req, res) {
	OrderTable.findOne({table: req.body.table}, function(err, result) {
		if(err) {
			console.log('Could not find order table')
		} else {
			var orderItem = new OrderItem({name: req.body.name, price: req.body.price, category: req.body.category})
			orderItem._table = result._id
			result.items.push(orderItem)
			result.save(function(err) {
				if(err) {
					console.log('error!')
				} else {
					orderItem.save(function(err, data) {
						if(err) {
							console.log('err')
						} else {
							console.log('success in saving orderItem!!')
							res.end();
						}
					})
				}
			})
		}
	})
}

orders.getOrderItems = function(req, res) {
	console.log(req.params.id)
	OrderTable.findOne({table: req.params.id})
	.populate('items')
	.exec(function(error, results) {
		if(error) {
			console.log('could not get table items')
		} else {
			res.json(results)
			console.log(results)
			res.end();
		}
	})
}



orders.removeOrderItem = function(req, res) {
	OrderItem.remove({_id: req.body.id}, function(err) {
		if(err) {
			console.log(err)
		} else {
			console.log('successfully removed order item')
			res.end();
		}
	})
}

orders.submitOrder = function(req, res) {
	OrderTable.findByIdAndUpdate(req.body.id, {$set: { submitted: true}}, function(error, data) {
		if(error) {
			console.log('error submitting order')
		} else {
			console.log('successfully updated order')
			console.log(data)
			res.json(data)
		}
	});
}


//Testing delete after
orders.getOrderTables = function(req, res) {
	OrderTable.find({}, function(err, results) {
		if(err) {
			console.log('could not get order table')
		} else {
			res.json(results)
			console.log('successfully got order tables')
		}
	})
}

orders.getSubmittedOrders = function(req, res) {
	OrderTable.find({submitted: true})
	.populate('items')
	.exec(function(err, results) {
		if(err) {
			console.log('error!!!')
		} else {
			console.log('go the items populated')
			res.json(results)
			res.end();
		}
	})
}

orders.removeSubmittedOrder = function(req, res) {
	OrderTable.findByIdAndUpdate(req.body.id, {$set: { submitted: false}}, function(error, data) {
		if(error) {
			console.log('error submitting order')
		} else {
			console.log('successfully updated order')
			console.log(data)
			res.json(data)
		}
	});
}



// orders.getSubmittedOrders = function(req, res) {
// 	OrderTable.find({submitted: true}, function(err, results) {
// 		if(err) {
// 			console.log('error getting submitted ordrs')
// 		} else {
// 			res.json(results)
// 		}
// 	})
// }



module.exports = orders;