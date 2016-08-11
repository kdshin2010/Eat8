var mongoose = require('mongoose');
var MenuItem = require('../models/MenuItem.js');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var MenuCategorySchema = new mongoose.Schema({
	name: String,
	user: {type: String, ref: "User"},
	items: [
		{
			type: ObjectId,
			ref: "MenuItem"
		}
	]
})

mongoose.model('MenuCategory', MenuCategorySchema);
