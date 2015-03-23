var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	username:String,
	longitude:String,
	latitude:String,
	lastPositionTime:Date
	
});

module.exports = mongoose.model('userInfo',userSchema);