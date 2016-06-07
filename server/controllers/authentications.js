var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Mailjet = require('node-mailjet').connect('5535f8aa9b5434b9354c413d0f9a3585', 'f85f47de676ec1c3a22c963aaff97a77');

var authentications = {}
var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};
var sendEmail = Mailjet.post('send');

authentications.testMailJet = function(req, res) {
	console.log(req.body.email)
	var emailData = {
	    'FromEmail': 'kdshin2010@gmail.com',
	    'FromName': 'Kyle',
	    'Subject': 'Hey thanks for signing up for Eat 8 ',
	    'Text-part': 'Hey thanks for signing up for ea8',
	    'Recipients': [{'Email': 'Kkdshin2010@gmail.com'}]
	}
	Mailjet.post('send')
		.request(emailData).then(function(data) {
			res.json({"message": 'email successfully sent!'});
		})
		.catch(function(){
			console.log('error!')
		})
}



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