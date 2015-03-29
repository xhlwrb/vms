var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

	var clientIP = req['client']['_peername'];
	if(clientIP != "127.0.0.1")
	{
		res.redirect('');
	}
	res.render("config",{title:"设置"});
	
});


module.exports = router;
