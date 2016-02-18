var express = require('express'),
	routes = express.Router(),
	passport = require('passport'),
	User = require('../models/User.js'),
	menus = require('../controllers/menus.js')

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

routes.post('/addCategory', function(req, res) {
	menus.create(req, res);
})

routes.get('/getCategories', function(req, res) {
	menus.show(req, res);
})

routes.post('/addItem', function(req, res){
	menus.addItem(req, res)
})

routes.get('/getItems', function(req, res){
	menus.getItems(req, res)
})

module.exports = routes;
