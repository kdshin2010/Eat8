//user model set up
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');


var User = new mongoose.Schema({
	username: String,
	password: String
})

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User)
