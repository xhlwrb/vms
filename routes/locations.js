var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfo');
/* GET home page. */
router.get('/', function(req, res) {
	recordSet.find({},function(err,data){
		if(!err)
		{
			// console.log(data);
			var data2send = '';
			
			for(var i = 0;i<data.length;i++)
			{
				var tempTel = data[i]['username'];
				var tempX = data[i]['longitude'];
				var tempY = data[i]['latitude'];
				var time = data[i]['lastPositionTime'];

				var currentTime = new Date();
				var seconds = time.getSeconds();
				//console.log(time);
				time.setSeconds(seconds + 6);
				//console.log(time);
				//console.log(currentTime);

				if(time < currentTime )
				{
					recordSet.remove({username:String(tempTel)},function(err){
						if(err)
						{
					        console.log(err);
					    }
					    else
					    {
					        //console.log(time);
					    }
						//console.log("remove "+tempTel+"! OK");
					});
				}
				//console.log(Math.floor(Math.random()*1000)/100000);
				data2send += String(tempTel);
				data2send += ',';
				data2send += String(tempX);
				data2send += ',';
				data2send += String(tempY);
				if(i != data.length - 1)
					data2send += ';';
			}
			
			res.setHeader('Content-Type', 'text/event-stream');
		    res.send("data:"+data2send +"\r\n\r\n");
		}
	});

});

module.exports = router;
