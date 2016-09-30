// for now we will createa another tables db but hopefully we can combine them you know what i maen
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


var OrderItemSchema = new mongoose.Schema({
	_table: {type: ObjectId, ref: 'OrderTable'},
	name: String,
	price: Number,
	category: String,
	quantity: Number
})

var OrderItems = mongoose.model('OrderItem', OrderItemSchema)




