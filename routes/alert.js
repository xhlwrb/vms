var express = require('express');
var router = express.Router();
// var recordSet = require('../models/userInfo');
/* GET home page. */
router.get('/', function(req, res) {

	if(global.alertNum >= 1)
	{
		var data2send = "alert";
		res.setHeader('Content-Type', 'text/event-stream');
		res.send("data:"+data2send +"\r\n\r\n");
	}
	else
	{
		var data2send = "no";
		res.setHeader('Content-Type', 'text/event-stream');
		res.send("data:"+data2send +"\r\n\r\n");
	}
});

module.exports = router;
