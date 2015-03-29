var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfo');

var url = require('url');

/* GET home page. */
router.get('/', function(req, res) {
	
	var fs = require('fs');

	fs.readFile(__dirname+"/../public/clientConfig/border.json",function(err,data){
		res.send(data);
	});



	
	

});



module.exports = router;
