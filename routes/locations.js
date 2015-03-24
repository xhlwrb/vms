var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfo');
/* GET home page. */
router.get('/', function(req, res) {
	recordSet.find({},function(err,data){
		if(!err)
		{
			
			
			var data2send = '';
			var alertNum = 0;
			for(var i = 0;i<data.length;i++)
			{
				if(data[i]['fall'] == "1")
					alertNum ++;
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
					        
					    }
						
					});
				}
				
				data2send += String(tempTel);
				data2send += ',';
				data2send += String(tempX);
				data2send += ',';
				data2send += String(tempY);
				if(i != data.length - 1)
					data2send += ';';
				// 正式使用时删掉 else
				else
				{
					data2send += ';';
				}
			}

			// 为测试而加
			var max = 100;
			for(var i = 0;i<max;i++)
			{
				
				alertNum ++;
				var tempTel = 'username';
				var tempX = Math.floor(Math.random() * 1000000)/1000000 + 120;
				var tempY = Math.floor(Math.random() * 1000000)/1000000 + 30;
				
				data2send += String(tempTel);
				data2send += ',';
				data2send += String(tempX);
				data2send += ',';
				data2send += String(tempY);
				if(i != max-1)
					data2send += ';';
			}



			global.alertNum = alertNum;
			res.setHeader('Content-Type', 'text/event-stream');
		    res.send("data:"+data2send +"\r\n\r\n");

		}
	});

});

module.exports = router;
