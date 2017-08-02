
canvasTemp = document.getElementById('world_Temp');
ctxTemp = canvasTemp.getContext('2d');
wTemp = canvasTemp.width;
hTemp = canvasTemp.height;

g.clMap.temp = function (i,j) {

	var step = g.clMap.step;
	var weight = g.clMap.weight;
	var size = g.clMap.size;
	var detail = g.clMap.detail;
	var offset = g.clMap.offset;
	var flatten = g.clMap.flatten;

	var temp_ = 0
	temp_ -= tempHeightMap(i,j,Math.pow(step,3),Math.pow(weight,2),size*2,detail/3,offset+7000,flatten)*3; // random height map
	//if (temp_>5) temp_=5;

	temp__ = tempHeightMap(i,j,step,weight,size,detail/5,offset,flatten); // actual height map
	if (temp__>=0) temp__ = Math.pow(temp__/3.5,1.8)
	else temp__ = -Math.pow(-temp__/3.5,1.8)
	//if (temp__>5) temp__=5;
	temp_ -= temp__*5.468
	
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

function tempHeightMap(i,j,step,weight,size,detail,offset,flatten) {
	var mag = 0;

	for (var k = 1; k < detail; k++) {
		offset += seed + k*25;
		mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k);
	}

	mag/=flatten;
	//mag-=Math.pow(dist(i,j)/(h/3),7);
	return mag;
}