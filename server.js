// server
var express = require('express');
var app = express();
const port=3000;

// read import csv
var output=[];
var fs = require('fs');
var csv = require('fast-csv');

////// read information of lat lng of every district
var district=[];
var car_info=[];

fs.createReadStream('carCenter.csv')
.pipe(csv())
.on('data', function(data){
    data=String(data);
    //data=data.replace("[","");
    //data=data.replace("]","");
    data=data.split(/,/);
    district.push(data);
    })
.on('end', function(data){
    	for(var i=1; i<district.length-1; i++){
            car_info.push(district[i]);
        }
        // read car number of every district
        var car=[]
        fs.createReadStream('carN.csv')
        .pipe(csv())
        .on('data', function(data){
            data=String(data);
            data=data.split(/,/);
            car.push(data);
            })
        .on('end', function(data){
               for(var i=0; i<car.length-1; i++){
	           car_info[i][3]=car[i][1];
	       }
	       for(var i=0; i<car_info.length; i++){
	       		console.log("car info:"+car_info[i]);
		}
		console.log("car len:"+car_info.length);
            });
    });
///// read motor

var dist=[];
var motor_info=[];
fs.createReadStream('motorCenter.csv')
.pipe(csv())
.on('data', function(data){
    data=String(data);
    //data=data.replace("[","");
    //data=data.replace("]","");
    data=data.split(/,/);
    dist.push(data);
    })
.on('end', function(data){
    	for(var i=1; i<dist.length-1; i++){
            motor_info.push(dist[i]);
        }
        // read car number of every district
        var motor=[]
        fs.createReadStream('motorN.csv')
        .pipe(csv())
        .on('data', function(data){
            data=String(data);
            data=data.split(/,/);
            motor.push(data);
            })
        .on('end', function(data){
               for(var i=0; i<motor.length-1; i++){
	           motor_info[i][3]=motor[i][1];
	       }
	       for(var i=0; i<motor_info.length; i++){
	       		console.log("motor info:"+motor_info[i]);
		}
		console.log("motor len:"+motor_info.length);
            });
    });



app.use(express.static(__dirname + '/public'))

app.listen(port, function () {
      console.log('Example app listening on port 3000!');
});


var spawn = require('child_process').spawn;
app.get('/ajax_data', function (req, res) {
    	
	return res.send({car:car_info, motor:motor_info});
});

// predict
app.get('/ajax_predict', function (req, res) {
	var pre;
	console.log("start here");
	console.log("time:"+req.query.time);
	console.log("week:"+req.query.week);
	console.log("month:"+req.query.month);
	console.log("latlng:"+req.query.loc);
	var pythonProcess = spawn('python3',["./Ann.py", req.query.time, req.query.week, req.query.month, req.query.loc]);
	pythonProcess.stdout.on('data', function(data){
		pre=data.toString();
		console.log(data.toString());
		console.log("ann here");
		res.send(pre);
	});
	pythonProcess.stderr.on('data', function (data){
	    	console.log(data.toString());
	    });
});
