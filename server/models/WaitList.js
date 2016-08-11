var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var MenuCategorySchema = new mongoose.Schema({
	Name: String,
	Phone_Number: Number,
	Size: Number,
	Notified: Boolean
	
})

mongoose.model('WaitListSchema', WaitListSchema);
