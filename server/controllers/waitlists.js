var mongoose = require('mongoose'),
	routes = require('../config/routes.js'),
	Waitlist = mongoose.model('Waitlist'),
	twilioConfig = require('../config/twilio.config.js'),
	twilioClient = require('twilio')(twilioConfig.accountSid, twilioConfig.authToken);

	waitlists = {};


	waitlists.notify = function(req, res) {
		twilioClient.messages.create({
			body: "Hello! You're Table for " + req.body.size + "is ready. Please come to the host area",
			to: req.body.number,
			from: twilioConfig.sendingNumber
		}, function(err ,data) {
			if(err) {
				console.log('error')
			} else {
				console.log(data)
				res.json(data)
				console.log('success')
				res.end()
			}
		})

	}


	waitlists.show = function(req, res) {
		Waitlist.find({}, function(err, results) {
			if(err) {
				console.log('could not retreive the waitlists');
				res.end()
			} else {
				res.json(results);
				res.end()
			}
		})
	}

	waitlists.addGroup = function(req, res) {
		var waitlist = new Waitlist({name: req.body.name, phone_number: req.body.number, size: req.body.size, notification: req.body.notification})
		waitlist.save(function(err, result) {
			if(err) {
				console.log('error saving waitlist');
				res.end();
			} else {
				res.json(result)
				res.end();
			}
		})

	}

	waitlists.removeGroup = function(req, res) {
		Waitlist.find({})
		console.log('here about to remove below is the id')
		console.log(req.body.id)
		Waitlist.remove({_id: req.body.id}, function(err, data) {
			if(err) {
				console.log('err`')
			} else {
				res.json(data)
				console.log('successfuly removed group');
			}
		})
	}



module.exports = waitlists;
