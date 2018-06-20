var car_info;
var motor_info;
$(document).ready(function(){
    console.log("document: ready");
    $.ajax({
	method:"get",
	url:'./ajax_data',
	data:{},
	success: function(data){
	    car_info=data.car;
	    motor_info=data.motor;
	    console.log("car:"+data.car[1]);
	    console.log("motor:"+data.motor[1]);
	}
    })
})
function initMap(){
    console.log("init map");
    var map = new google.maps.Map(document.getElementById('map'), {
	zoom: 13,
	center: {lat: 22.999728, lng: 120.227028}});
    
    var geocoder = new google.maps.Geocoder();
    // after press subnit button, it will zoom to the center
    document.getElementById('submit').addEventListener('click', function() { geocodeAddress(geocoder, map);});
    $("#car").click(function(){carfunction(map)});
    $("#motor").click(function(){motorfunction(map)});
    $("#select").click(function(){predict(geocoder, map)});
}
// predict
var premark;
var level;
function predict(geocoder, resultsMap){
    var date = new Date($('#date').val());
    day = date.getDate();
    month = date.getMonth() + 1;
    year = date.getFullYear();
    console.log("date:"+day, month, year);
    
    var week;
    dayofweek=$("#day").val();
    if(dayofweek=='一'){
    	week='1';
    }else if(dayofweek=='二'){
    	week='2';
    }else if(dayofweek=='三'){
    	week='3';
    }else if(dayofweek=='四'){
    	week='4';
    }else if(dayofweek=='五'){
    	week='5';
    }else if(dayofweek=='六'){
    	week='6';
    }else if(dayofweek=='日'){
    	week='0';
    }
    console.log("week:"+week);
    time=$("#time").val();
    var latlng;
    var adr = document.getElementById('adr').value;
    geocoder.geocode({'address': adr}, function(results, status) {
	if(premark!=null){
	    premark.setMap(null);
	}
	if (status === 'OK') {
	    resultsMap.setCenter(results[0].geometry.location);
	    latlng=results[0].geometry.location;
	    latlng=latlng.toString();
	    premark = new google.maps.Marker({
	    map: resultsMap,
	    position: results[0].geometry.location
	    })
	    console.log("latlng:"+latlng);
	    
	    $.ajax({
		method:"get",
		url:'./ajax_predict',
		data:{
		   time:time,
		   week:week,
		   month:month,
		   loc:latlng,
		},
		success: function(data){
		    level=data;
		    if(data==0){
		    	console.log("predict:0");
			document.getElementById("level").innerHTML = "程度：低";
		    }
		    if(data==1){
		    	console.log("predict:1");
			document.getElementById("level").innerHTML = "程度：低中";
		    }
		    if(data==2){
		    	console.log("predict:2");
			document.getElementById("level").innerHTML = "程度：中";
		    }
		    if(data==3){
		    	console.log("predict:3");
			document.getElementById("level").innerHTML = "程度：中高";
		    }
		    if(data==4){
		    	console.log("predict:4");
			document.getElementById("level").innerHTML = "程度：高";
		    }
		}
	    })
	}
	else {
	    alert('Geocode was not successful for the following reason: ' + status);
	}
    });
}



// if checkbox-car checked
var carList=[];
function carfunction(resultsMap) {
    var checkBox = document.getElementById("car");
    if (checkBox.checked == true){
	    for(var i=0; i<car_info.length; i++){
	    	carList.push(new google.maps.Circle({
		strokeColor: '#000000',
		strockOpacity: 0.7,
		strokeWeight: 0.2,
		fillColor: '#ff0000',
		fillOpacity: 0.25,
		map:resultsMap,
		// 2006:500=value:m
		radius:Math.sqrt(parseInt(car_info[i][3]))*6,
		center:new google.maps.LatLng(car_info[i][0], car_info[i][1]),
		}));
	    }  
	//text.style.display = "block";
    } else {
	    if(carList != null){
		console.log("circleList != null");
		console.log(carList.length);
		for(var i=0; i< carList.length; i++){
			carList[i].setMap(null);
		}	
		carList=[];
	    }
	    //text.style.display = "none";
    }
}

// if checkbox-motor checked
var motorList=[];
function motorfunction(resultsMap) {
    var checkBox = document.getElementById("motor");
    if (checkBox.checked == true){
	    for(var i=0; i<motor_info.length; i++){
	    	motorList.push(new google.maps.Circle({
		strokeColor: '#000000',
		strockOpacity: 0.7,
		strokeWeight: 0.2,
		fillColor: '#1feb26',
		fillOpacity: 0.25,
		map:resultsMap,
		// 2006:500=value:m
		radius:Math.log10(parseInt(motor_info[i][3]))*90,
		center:new google.maps.LatLng(motor_info[i][0], motor_info[i][1]),
		}));
	    }  
	//text.style.display = "block";
    } else {
	    if(motorList != null){
		console.log("circleList != null");
		console.log(motorList.length);
		for(var i=0; i< motorList.length; i++){
			motorList[i].setMap(null);
		}	
		motorList=[];
	    }
    }
}
var marker;
// geocode user location
function geocodeAddress(geocoder, resultsMap) {
    console.log("geocodeAddress");
    var address = document.getElementById('address').value;
    geocoder.geocode({'address': address}, function(results, status) {
	if(marker!=null){
	    marker.setMap(null);
	}
	if (status === 'OK') {
	    resultsMap.setCenter(results[0].geometry.location);
	    	marker = new google.maps.Marker({
		map: resultsMap,
		position: results[0].geometry.location
		
		});
	}
	else {
	    alert('Geocode was not successful for the following reason: ' + status);
	}
    });
}


