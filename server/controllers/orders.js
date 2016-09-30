var mongoose = require('mongoose'),
	routes = require('../config/routes.js'),
	OrderTable = mongoose.model('OrderTable'),
	OrderItem = mongoose.model('OrderItem'),
	orders = {};





//add the first table
//lets just create a table with the tabId

orders.createTable = function(req, res) {
	var ordertable = new OrderTable({tabId: req.body.id, table_number: req.body.id_number, left:0, top: 0})
	ordertable.save(function(err, data) {
		if(err) {
			console.log('err saving table')
		} else {
			console.log('SUCCESS SAVING TABLE');
			res.json(data);
		}
	})
} 

orders.showTables = function(req, res) {
	OrderTable.find({}, function(err, results) {
		if(err) {
			console.log('error getting tables')
		} else {
			console.log(results)
			res.json(results)
		}
	})
}

orders.deleteAll = function(req, res) {
	OrderTable.remove({}, function(err, data) {
		if(err) {
			console.log(err)
		} else {
			console.log('successfully removed all tables');
			res.json(data)
		}
	})
}



orders.updateCoord = function(req, res) {
	console.log(req.body)
	OrderTable.update({tabId: req.body.id}, { $set: { left: req.body.left, top: req.body.top}}, function(err, data) {
		if(err) {
			console.log(err)
		} else {
			console.log(data)
			res.json(data)
		}
	});
}

orders.deleteTable = function(req, res) {
	console.log(req.body)
	OrderTable.remove({tabId: req.body.id}, function(err){
		if(err) {
			console.log('err')
		} else {
			res.send('deleted tables')
			console.log('successfully deleted Table')
		}
	})
}

//custom value for tables


orders.standardTables = function(req, res) {
	var tables = [];
	for (var i=0; i<req.body.num; i++) {
		var table = new Table({tabId: 'tab'+i})
		tables.push(table)
	}
	console.log(tables)
	OrderTable.insertMany(tables)
	.then(function(data) {
		res.json(data)
	})
	.catch(function() {
		console.log('error')
	})
}


orders.selectTable = function(req, res) {
	OrderTable.find({table_number: req.body.table}, function(err, results) {
		if(results.length) {
			console.log('could not save, table already exists!!')
			res.send('Table Exists!')
		} else {
			var table = new OrderTable({table_number: req.body.table})
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
	OrderTable.findOne({table_number: req.body.table}, function(err, result) {
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
	OrderTable.findOne({table_number: req.params.id})
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


orders.submitOrder = function(req, res) {
	OrderTable.findOne({table_number: req.body.table}, function(err, result) {
		if(err) return handleError(err);
		console.log(result)
		result.submitted = true;
		result.total = req.body.total
		result.save(function(err, updatedResult) {
			if(err) return handleError(err);
			console.log(updatedResult)
			res.json(updatedResult)
		})
	})
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
	// OrderTable.find({submitted: true})
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


orders.getRates = function(req, res){
	console.log(req.body)
	taxjar.ratesForLocation(req.body.zipcode).then(function(data) {
		console.log(data.rate);
		res.json(data.rate);
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



/*

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
	Table.remove({}, function(err, data) {
		if(err) {
			console.log(err)
		} else {
			console.log('successfully removed all tables');
			res.json(data)
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
			res.send('deleted tables')
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















module.exports = orders;

