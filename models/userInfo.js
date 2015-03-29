var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var userSchema = new Schema({
	deviceId:String,
	longitude:String,
	latitude:String,
	fall:String,
	lastPositionTime:Date
	
});

module.exports = mongoose.model('userInfo',userSchema);