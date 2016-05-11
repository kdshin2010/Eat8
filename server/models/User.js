//user model set up
var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema,
	passportLocalMongoose = require('passport-local-mongoose');

var User = new mongoose.Schema({
	username: {
		type: String, 
		unique: true,
		required: true
	},
	hash: String,
	salt: String
});


//salt and has methods
User.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};


//check if valid password
User.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

//generate Json Web Token
User.methods.generateJwt = function() {
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		exp: parseInt(expiry.getTime() / 1000),
	}, "MY_SECRET") // FIX THIS ***** DO NOT KEEP SECRET IN CODE
}

mongoose.model('User', User);
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User)
