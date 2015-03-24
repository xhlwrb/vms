var express = require('express');
var router = express.Router();
// var recordSet = require('../models/userInfo');
/* GET home page. */
router.get('/', function(req, res) {

	var data2send = {};
	var alert = "no";
	var longitude = "";
	var latitude = "";
		

	if(global.alertNum > 100)
	{
		var alert = "alert";
		var longitude = "120.073694";
		var latitude = "30.269552";
	}
	
	var data2send = JSON.stringify({alert:alert,longitude:longitude,latitude:latitude});
	res.setHeader('Content-Type', 'text/event-stream');
	res.send("data:"+data2send +"\r\n\r\n");
});

module.exports = router;
