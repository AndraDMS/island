
var defColour = [29,50,88,255]
var conds = [{h:-0.5,c:[23,66,145,255]},/*{h:0.0,c:[245,233,206,255]},*/{h:0.0,c:[97,184,72,255]},{h:0.5,c:[51,125,92,255]},{h:1.5,c:[63,93,80,255]},{h:3,c:[150,163,161,255]},{h:4.5,c:[206,236,245,255]}]

function refresh() {
	seed = Math.ceil(Math.random()*65536)
	noise.seed(seed);
	generate();
}

function generate() {
	console.log("Start: " + (new Date).getTime());
	for (var i = -w/2; i <= w/2; i+=pixelSize) {
		for (var j = -h/2; j <= h/2; j+=pixelSize) {

			var height = heightMap(i,j,1.3,1.2,500,30,-1000,1.5);
			var temperature = temperatureMap(i,j,1.3,1.2,500,30,-1000,1.5)-15;
			ctxTemp.fillStyle = "rgba(" + Math.round(255*(temperature+10)/20) + ",0," + Math.round(255-255*(temperature+10)/20) + ",1)";
			ctxTemp.fillRect(i+wTemp/2,j+hTemp/2,pixelSize,pixelSize);
			//var step = 1.3;
			//var weight = 1.2;
			//var size = 500;
			//var detail = 30;
			//var offset = -1000;
			//var flatten = 1.5;

			//for (var k = 1; k < detail; k++) {
				//offset += seed + k*25;
				//mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k);
			//}

			//mag/=flatten;


			var output = defColour;
			//if (mag>=60) output = "rgb(" + mag + "," + mag + "," + mag + ")";
			for (var k = 0; k < conds.length; k++) {
				if (height > conds[k].h) {
					output = conds[k].c
				}
			}
			for (var k = 0; k < Math.pow(pixelSize,2); k++) {
				imgdata.data[4*((j+h/2+Math.floor(k/pixelSize))*w+i+w/2+(k%pixelSize))] = output[0];
				imgdata.data[4*((j+h/2+Math.floor(k/pixelSize))*w+i+w/2+(k%pixelSize))+1] = output[1];
				imgdata.data[4*((j+h/2+Math.floor(k/pixelSize))*w+i+w/2+(k%pixelSize))+2] = output[2];
				imgdata.data[4*((j+h/2+Math.floor(k/pixelSize))*w+i+w/2+(k%pixelSize))+3] = output[3];
			}
		}
	}
	console.log("End: " + (new Date).getTime());
	ctx.putImageData(imgdata,0,0)
	console.log("Print: " + (new Date).getTime());
}

function heightMap(i,j,step,weight,size,detail,offset,flatten) {
	var mag = 0;

	for (var k = 1; k < detail; k++) {
		offset += seed + k*25;
		mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k);
	}

	mag/=flatten;
	mag-=Math.pow(dist(i,j)/(h/3),7);
	if (mag>=0) mag = Math.pow(mag/3.5,1.8)
	else mag = -Math.pow(-mag/3.5,1.8)
	return mag;
}

function dist(x,y) {
	return Math.pow(x*x+y*y,1/2)
}

toff = 0;
function cloud() {
	this.s = Math.ceil(Math.random()*2)
	this.p = new vect([Math.random()*w-w/2,Math.random()*h-h/2]);
	var randomTheta = (Math.random()*2-1)*Math.PI
	this.v = new vect([Math.cos(randomTheta),Math.sin(randomTheta)])
	this.a = new vect([0,0])
	this.update = function () {
		this.a = new vect(windspeed(this.p.v[0],this.p.v[1],toff))
		this.v.add(this.a);
		this.v.throttle(.3);
		this.p.add(this.v);
		if (dist(this.p.v[0],this.p.v[1]) > hCloud/2.2) {
			this.p = new vect([-this.p.v[0]*0.8,-this.p.v[1]*0.8]);
		}
	}
	this.draw = function () {
		var x_ = pixelSize*Math.floor(this.p.v[0]/pixelSize);
		var y_ = pixelSize*Math.floor(this.p.v[1]/pixelSize);
		ctxCloud.fillStyle = "#fff";
		ctxCloud.fillRect(x_+wCloud/2,y_+hCloud/2,pixelSize*this.s,pixelSize*this.s);
	}
}
