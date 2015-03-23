var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {

	var fs = require('fs');
	
	fs.readFile(__dirname+"border.json",function (err,data)
	{
		var border = JSON.parse(data);
		// console.log(border);
		res.render("config",{title:"设置"});
	});
	
});


function setBorder()
{
	var border = [];
	var fs = require('fs');
	var areaPoints = [[0,0],[10,0],[14,4],[14,8],[0,8]];

	for(var i = 0;i<areaPoints.length;i++)
	{
		border.push({longitude:areaPoints[i][0],latitude:areaPoints[i][1]});
	}
	// console.log(border);
	
	fs.writeFile(__dirname+"border.json",JSON.stringify(border),function(err){
		if(err)
		{
			console.log(err);
		}
	});
}
// setBorder();

module.exports = router;
