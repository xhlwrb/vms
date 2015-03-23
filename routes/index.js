var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

	console.log(req['client']['_peername']);
	res.render('index', { title: '西溪湿地 游客监控系统' });
	

});

module.exports = router;
