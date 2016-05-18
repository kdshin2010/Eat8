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
  // comments = require('../controllers/comments.js'),


//register user
routes.post('/register', function(req, res) {
	authentications.register(req,res)
})

routes.post('/login', function(req, res) {
	authentications.login(req,res)
});


	routes = express.Router(),
	passport = require('passport'),
	User = require('../models/User.js'),
	menus = require('../controllers/menus.js'),
	orders = require('../controllers/orders.js')

//register user
routes.post('/user/register', function(req, res){
	User.register(new User({ username: req.body.username,}), req.body.password, function(err, account) {
		if (err) {
			return res.status(500).json({err: err});
		}
		passport.authenticate('local')(req, res, function() {
			return res.status(200).json({status: "Registration successful!"});
		});
	});
});

routes.post('/user/login', function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err) {
			return res.status(500).json({err: err});
		}
		if(!user) {
			return res.status(401).json({err: info});
		}
		req.logIn(user, function(err) {
			if(err) {
				return res.status(500).json({err: 'Could not log user in'});
			}
			res.status(200).json({status: 'Login Succesful!', user: user});
			console.log(req.user)
		});
	})(req, res, next);
});
>>>>>>> f259d9bcffa1ac48891a0fe4349193209093602d

routes.post('/removeCategory', function(req, res) {
	menus.removeCategory(req, res)
})

routes.post('/addCategory', function(req, res) {
	menus.create(req, res);
})

routes.get('/getCategories', function(req, res) {
	menus.show(req, res);
})

routes.post('/addItem', function(req, res){
	menus.addItem(req, res);
})

routes.get('/getItems', function(req, res){
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
})

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
