var express = require('express'),
  routes = express.Router(),
  passport = require('passport'),
  jwt = require('express-jwt'),
  auth = jwt({
    secret: 'MY_SECRET',
    userProperty: 'payload'
  }),
  users = require('../Controllers/users.js')
  authentications = require('../Controllers/authentications.js')
  menus = require('../controllers/menus.js'),
  icons = require('../controllers/icons.js'),
  waitlists = require('../controllers/waitlists.js'),
  orders = require('../controllers/orders.js');


  var routes = express.Router(),
  User = require('../models/User.js');


// comments = require('../controllers/comments.js'),
routes.post('/getSalesTax', function(req, res) {
	console.log('at the rotues')
	orders.getRates(req,res)
})


//Standard Tables
routes.post('/standardTable', function(req, res) {
	orders.standardTables(req, res)
})

//Waitlist
routes.post('/addGroup', function(req, res) {
	waitlists.addGroup(req, res)
});

routes.post('/removeGroup', function(req, res) {
	console.log('here')
	waitlists.removeGroup(req, res)
})

routes.get('/testTwilio', function(req, res) {
	waitlists.sendText(req, res)
})


routes.get('/getGroups', function(req, res) {
	waitlists.show(req, res)
})

routes.post('/notify', function(req, res) {
	waitlists.notify(req, res)
})

routes.post('/markAsPaid', function(req, res){
	console.log('here')
	orders.markAsPaid(req,res)
})




//welcome email

routes.post('/sendWelcomeEmail', function(req, res) {
	authentications.sendWelcomeEmail(req, res)
})


routes.get('/taxjartest', function(req, res) {
	console.log('at the routes')
	orders.testTaxjar(req, res)
})

//register user
routes.post('/register', function(req, res) {
	authentications.register(req,res)
})

routes.post('/login', function(req, res) {
	authentications.login(req,res)
});

//register user

routes.post('/previewCategory', function(req, res){
	menus.previewCategory(req, res)
})

routes.post('/removeCategory', function(req, res) {
	menus.removeCategory(req, res)
})

//icons and talbes

routes.post('/deleteIcon', function(req, res) {
	if(req.body.id[0] === 't') {
		orders.deleteTable(req, res)
	} else {
		icons.delete(req, res)
	}
})

routes.post('/deleteImage',function (req, res) {
	icons.remove(req,res)
})

routes.post('/deleteTables', function(req, res) {
	orderTables.deleteAll(req, res)
})


//add and retrieve tables

// routes.post('/addTable', function(req, res) {
// 	tables.create(req, res);
// })

routes.get('/getTables', function(req, res) {
	orders.showTables(req, res);
})


//update coordinates on tables
routes.post('/updateCoord', function(req, res) {
	console.log(req.body)
	if (req.body.id.substring(0,3) === 'tab') {
		orders.updateCoord(req, res)
	} else {
		icons.updateCoord(req, res)
	}
})

routes.post('/addIcon', function(req, res) {
	console.log(req.body.id[0])
	// if t add table if i add icon
	if(req.body.id[0] === 't') {
		orders.createTable(req, res)
	} else {
		icons.create(req, res)
	}
})

routes.post('/submitOrder', function(req, res) {
	orders.submitOrder(req, res)

})

routes.get('/getIcons', function(req, res) {
	icons.show(req, res)
})


routes.post('/addCategory', function(req, res) {
	menus.create(req, res);
})

routes.post('/getCategories', function(req, res) {
	menus.show(req, res);
})

routes.post('/addItem', function(req, res){
	menus.addItem(req, res);
})

routes.post('/editCategory', function(req, res){
	menus.editCategory(req, res)
})

routes.post('/addItems', function(req, res){
	menus.addItems(req, res)
})

routes.post('/getItems', function(req, res){
	//category id and array of items
	menus.getItems(req, res);
})

routes.post('/updateItem', function(req, res) {
	menus.updateItem(req, res)
})

routes.post('/removeItem', function(req, res) {
	menus.removeItem(req, res)
})
routes.post('/addOrderItem', function(req, res) {
	orders.addOrderItem(req, res)
})

routes.post('/selectTable', function(req, res) {
	orders.selectTable(req, res)
})

routes.get('/getOrderItems/:id', function(req, res) {
	orders.getOrderItems(req, res)
})

routes.post('/removeOrderItem', function(req, res) {
	orders.removeOrderItem(req,res)
})

routes.post('/submitOrder', function(req, res) {
	orders.submitOrder(req, res)
});

//Testing delete after
routes.get('/getOrderTables', function(req, res) {
	orders.getOrderTables(req, res)
})


routes.get('/getSubmittedOrders', function(req, res) {
	orders.getSubmittedOrders(req, res)
})
routes.post('/removeSubmittedOrder', function(req, res) {
	orders.removeSubmittedOrder(req, res)
})

module.exports = routes;
