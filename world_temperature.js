
canvasTemp = document.getElementById('world_Temp');
ctxTemp = canvasTemp.getContext('2d');
wTemp = canvasTemp.width;
hTemp = canvasTemp.height;

function temperatureMap(i,j,step,weight,size,detail,offset,flatten) {

	var temp_ = 0
	temp_ -= tempHeightMap(i,j,Math.pow(step,3),Math.pow(weight,2),size/4,detail/5,offset+7000,flatten)/1.5; // random height map
	if (temp_>5) temp_=5;

	temp__ = heightMap(i,j,step,weight,size,detail/5,offset,flatten)*5.468; // actual height map
	if (temp__<-5) temp__=-5;
	//if (temp__>5) temp__=5;
	temp_ -= temp__
	
	y_ = i*Math.sin(seed)+j*Math.cos(seed);
	temp_ += Math.cos(Math.PI*y_/hTemp)*60-30 // latitude based temperature

	return temp_
}

function toggleTemperature() {
	if (canvasTemp.style.display != "none") {
		canvasTemp.style.display = "none"
	} else {
		canvasTemp.style.display = "inline-block"
	}
}

function testHumidity(y) {
	return (Math.cos(1.65*Math.PI*(1-Math.pow(Math.E,-Math.pow(4*Math.PI*y/hTemp,2)/2)))+1)/2
}

function tempHeightMap(i,j,step,weight,size,detail,offset,flatten) {
	var mag = 0;

	for (var k = 1; k < detail; k++) {
		offset += seed + k*25;
		mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k);
	}

	mag/=flatten;
	mag-=Math.pow(dist(i,j)/(h/3),7);
	return mag;
}