var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var authentications = {}

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

authentications.register = function(req, res) {
	var user = new User();
	user.username = req.body.username;
	user.setPassword(req.body.password);

	user.save(function(err) {
		var token;
		if(err) {
			console.log(err)
		} else {
			token = user.generateJwt();
			res.status(200);
			console.log('succesfully registered user!')
			res.json({
				"token": token
			})
		}
	});
}

authentications.login = function(req, res) {
	passport.authenticate('local', function(err, user, info) {
		var token;
		if(err) {
			res.json(404).json(err);
			return;
		}
		console.log('skipped the error part!')
		if (user) {
			token = user.generateJwt();
			res.status(200);
			res.json({
				"token": token
			});
		} else {
			res.status(401).json(info);
		}
	})(req, res)
}

module.exports = authentications