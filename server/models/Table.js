var mongoose = require('mongoose');
var Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;



var TableSchema = new mongoose.Schema({
	tabId: String,
	left: Number,
	top: Number
})



mongoose.model('Table', TableSchema)

