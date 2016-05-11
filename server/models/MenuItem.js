var mongoose = require('mongoose');
var MenuCategory = require('../models/MenuCategory.js')
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var MenuItemSchema = new mongoose.Schema({
	_category: {type: ObjectId, ref: MenuCategory},
	name: String,
	price: Number,
	description: String
})

module.exports = mongoose.model('MenuItem', MenuItemSchema)
