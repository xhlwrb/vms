var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res) {

	
	setBorder(req.body);
	res.redirect("/");
});


function setBorder(data)
{
	var border = [];
	var areaPoints = [[0,0],[10,0],[14,4],[14,8],[0,8]];

	var str1 = "location";
	var strX = "location01X";
	var strY = "location01Y";
	var i = 1;
	while(data[strX] != undefined)
	{
		i ++;
		// console.log(data[strX]);
		border.push({longitude:data[strX],latitude:data[strY]});

		var str2 = i < 10?'0'+String(i):String(i);
		strX = str1;
		strX += str2;
		strX += "X";

		strY = str1;
		strY += str2;
		strY += "Y";
		
		
	}
	console.log(border);
	var data2Store = {"limit":border};

	var fs = require('fs');
	fs.writeFile(__dirname+"/../public/clientConfig/border.json",JSON.stringify(data2Store),function(err){
		if(err)
		{
			console.log(err);
		}
	});
}


module.exports = router;
