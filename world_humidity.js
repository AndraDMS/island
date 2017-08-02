
function testHumidity(y) {
	return (Math.cos(1.65*Math.PI*(1-Math.pow(Math.E,-Math.pow(2*Math.PI*y/hHum,2)/2)))+1)/2
}

canvasHum = document.getElementById('world_Hum');
ctxHum = canvasHum.getContext('2d');
wHum = canvasHum.width;
hHum = canvasHum.height;

g.clMap.hum = function (i,j) {

	var step = g.clMap.step;
	var weight = g.clMap.weight;
	var size = g.clMap.size;
	var detail = g.clMap.detail;
	var offset = g.clMap.offset;
	var flatten = g.clMap.flatten;

	var hum_ = 100

	y_ = i*Math.sin(seed)+j*Math.cos(seed);
	hum_ *= testHumidity(y_) // latitude based humidity

	hum__ = g.clMap.alt(i,j); // actual height map
	if (hum__<0) hum__ = 0;
	hum_ *= .75/(1+Math.pow(hum__,2))+.25
	//hum_ = (hum_*1.5+75/(1+Math.pow(hum__,2))+25)/2.5

	hum_ += tempHeightMap(i,j,Math.pow(step,3),Math.pow(weight,2),size*2,detail/4,offset+7000,flatten)*14; // random height map
	
	if (hum_ < 0) {hum_ = 0}
	if (hum_ > 100) {hum_ = 100}

	return hum_
}

function toggleHumidity() {
	if (canvasHum.style.display != "none") {
		canvasHum.style.display = "none"
	} else {
		canvasHum.style.display = "inline-block"
	}
}

/*
function tempHeightMap(i,j,step,weight,size,detail,offset,flatten) {
	var mag = 0;

	for (var k = 1; k < detail; k++) {
		offset += seed + k*25;
		mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k);
	}

	mag/=flatten;
	mag-=Math.pow(dist(i,j)/(h/3),7);
	return mag;
})*/