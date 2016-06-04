var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var OrderTableSchema = new mongoose.Schema({
	table: Number,
	items:[{ type: Schema.Types.ObjectId, ref: 'OrderItem'}],
	submitted: {type: Boolean, default: false}
})

var OrderItemSchema = new mongoose.Schema({
	_table: {type: ObjectId, ref: 'OrderTable'},
	name: String,
	price: Number,
	category: String,
	quantity: Number,
})

var OrderTable = mongoose.model('OrderTable', OrderTableSchema)
var OrderItems = mongoose.model('OrderItem', OrderItemSchema)

