var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var WaitlistSchema = new mongoose.Schema({
	name: String,
	phone_number: Number,
	size: Number,
	notification: Boolean,
	notified: Boolean
	
})

mongoose.model('Waitlist', WaitlistSchema);
