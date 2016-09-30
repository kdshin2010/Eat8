var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;


var OrderTableSchema = new mongoose.Schema({
	table_number: Number,
	tabId: String,
	left: Number,
	top: Number,
	items:[{ type: Schema.Types.ObjectId, ref: 'OrderItem'}],
	submitted: {type: Boolean, default: false},
	paid: {type: Boolean, default: false},
	total: {type: Number, default: 0}
})





var OrderTable = mongoose.model('OrderTable', OrderTableSchema)
