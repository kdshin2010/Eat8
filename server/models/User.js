//user model set up
var mongoose = require('mongoose'),
	crypto = require('crypto'),
<<<<<<< HEAD
	jwt = require('jsonwebtoken'),
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

User.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

=======
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
>>>>>>> f259d9bcffa1ac48891a0fe4349193209093602d
User.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

<<<<<<< HEAD
User.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    username: this.username,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model('User', User);


=======
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
>>>>>>> f259d9bcffa1ac48891a0fe4349193209093602d
