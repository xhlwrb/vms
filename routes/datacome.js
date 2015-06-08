var express = require('express');
var router = express.Router();
var recordSet = require('../models/userInfo');

var url = require('url');

/* GET home page. */
router.get('/', function(req, res) {
	var deviceId = url.parse(req.url, true).query["deviceId"];
	var longitude = url.parse(req.url, true).query["longitude"];
	var latitude = url.parse(req.url, true).query["latitude"];
	var fall = "1";
	var time = new Date();
	
	if(isInArea(longitude,latitude) == true)
	{
		if(deviceId == null)
		{
			deviceId = String(Math.floor(Math.random() * 100000000000));
			console.log("temp deviceId is :"+deviceId);
		}
		else
		{
			recordSet.find({deviceId:deviceId},function(err,data){
				if(!err)
				{
					if(data.length == 0)
					{
						var newData = new recordSet({
							deviceId:deviceId,
							longitude:longitude,
							latitude:latitude,
							fall:fall,
							lastPositionTime:time
						});

						newData.save(function(err,data){
							if(!err)
							{
							// console.log(data);
							}
					   });
					}
					else
					{
						
						if(data[0]['longitude'] != longitude ||  data[0]['latitude']  != latitude)
						{
							recordSet.update(
								{deviceId:deviceId},
								{$set: {longitude:longitude,latitude:latitude,fall:fall,lastPositionTime:time} },
								{multi:true},
								function(err){
									//console.log(err);
								});
							console.log(deviceId + " moved ... ");
						}
					}
				}
			});
		}
	}
	// 作为和传来的坐标数据没有关联的，但是有为了方便，直接在这个页面将电子围栏的坐标数据发送过去
	// 因此下面的代码也没有放到回掉函数里面，因为和前面的数据处理没有关联嘛
	var fs = require('fs');
	fs.readFile(__dirname+"/../public/clientConfig/border.json",function(err,data){
		res.send(data);
	});
	

});

// console.log(isInArea(0.0001,3.1001));

function distance(x1,y1,x2,y2)
{
	var dis = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
	return dis;
}

// 根据余弦定理求角度
function angle(x,y,x2,y2,x3,y3)
{
	var disNeighbor1 = distance(x,y,x2,y2);
	var disNeighbor2 = distance(x,y,x3,y3);
	var disForword   = distance(x2,y2,x3,y3);
	// 余弦定理
	var cosAngle = (Math.pow(disNeighbor1,2) + Math.pow(disNeighbor2,2) - Math.pow(disForword,2) ) / 
	(2 * disNeighbor1 * disNeighbor2);

	var ang = Math.acos(cosAngle);
	return ang;
}

function getBorder()
{
	var border = [];
	var fs = require('fs');
	
	fs.readFile(__dirname+"border.json",function(err,data){
		// console.log(JSON.parse(data));
		border = data;
	});
	return border;
}

function isInArea(longitude, latitude)
{
	var precision = 0.0000001;
	var border = getBorder();
	var pointsNum = border.length;;
	
	var angSum = 0.0;
	for(var i = 0;i < pointsNum;i++)
	{
		if(i == pointsNum - 1)
		{
			angSum += angle(longitude,latitude, border[i]['longitude'],border[i]['latitude'],border[0]['longitude'],border[0]['latitude']);
		}
		else
		{
			angSum += angle(longitude,latitude, border[i]['longitude'],border[i]['latitude'],border[i+1]['longitude'],border[i+1]['latitude']);
		}
	}
	// console.log("angSum :  "+angSum);
	// console.log("2 * PI :  "+2*Math.PI);
	return true;
	// 说明该点在范围内
	if(Math.abs(angSum - 2*Math.PI) < precision )
		return true;
	else
		return false;
}

module.exports = router;

// recordSet.remove({},function(err){
// 				console.log("remove all! OK");
// 			});

// var newData = new recordSet({
// 					username:"15757129719",
// 					longitude:"120.073694",
// 					latitude:"30.269552"
// 				});

// 				newData.save(function(err,data){
// 			      if(!err){
// 			         console.log(data);
			        
// 			      }
// 			   });