var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

	var clientIP = req['client']['_peername']['address'];
	console.log(clientIP);
	clientIP = "127.0.0.1";
	if(clientIP != "127.0.0.1")
	{
		res.redirect('/staticPages/noRight.html');
	}
	else
	{
		res.render("config",{title:"设置"});
	}
	
	
});


module.exports = router;
