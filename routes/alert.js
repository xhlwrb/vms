var express = require('express');
var router = express.Router();
// var recordSet = require('../models/userInfo');
/* GET home page. */
router.get('/', function(req, res) {

	var data2send = {};
	var alert = "no";
	var longitude = "";
	var latitude = "";
		

	if(global.alertNum > 500)
	{
		var alert = "alert";
		var longitude = global.longitude;
		var latitude = global.latitude;
	}
	
	var data2send = JSON.stringify({alert:alert,longitude:longitude,latitude:latitude});
	res.setHeader('Content-Type', 'text/event-stream');
	res.send("data:"+data2send +"\r\n\r\n");
});

module.exports = router;
