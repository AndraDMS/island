canvas = document.getElementById('world');
ctx = canvas.getContext('2d');
w = canvas.width;
h = canvas.height;

var imgdata = ctx.getImageData(0,0, w, h);
var imgdatalen = imgdata.data.length;

canvasCloud = document.getElementById('world_Clouds');
ctxCloud = canvasCloud.getContext('2d');
wCloud = canvasCloud.width;
hCloud = canvasCloud.height;


//feig = 4.669201609102990671853203821578;

function altCond(h,c,elem) {
	this.h = (h?h:0)
	this.c = (c?c:[0,0,0,0])
	//this.elem = 
}

var defColour = [29,50,88,255]
var conds = [{h:-2.5,c:[23,66,145,255]},/*{h:0.0,c:[245,233,206,255]},*/{h:0.0,c:[97,184,72,255]},{h:2.2,c:[51,125,92,255]},{h:4.3,c:[63,93,80,255]},{h:7,c:[150,163,161,255]},{h:8,c:[206,236,245,255]}]

pixelSize = 2;

seed = Math.random()
noise.seed(seed);

document.getElementById("f_PixelSize").addEventListener("input", function (e){
	var input_ = parseInt(e.target.value);
	if (input_) {
		pixelSize = input_;
		generate();
	}
} )

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
			height-=Math.pow(dist(i,j)/(h/3),7);
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
	return mag;
}

function dist(x,y) {
	return Math.pow(x*x+y*y,1/2)
}

toff = 0;
function cloud() {
	this.p = new vect([Math.random()*w-w/2,Math.random()*h-h/2]);
	var randomTheta = (Math.random()*2-1)*Math.PI
	this.v = new vect([Math.cos(randomTheta),Math.sin(randomTheta)])
	this.a = new vect([0,0])
	this.update = function () {
		this.a = new vect(windspeed(this.p.v[0],this.p.v[1],toff))
		this.v.add(this.a);
		this.v.throttle(1);
		this.p.add(this.v);
		if (Math.abs(this.p.v[0]) > wCloud/2 || Math.abs(this.p.v[1]) > hCloud/2) {
			this.p = new vect([Math.random()*w-w/2,Math.random()*h-h/2]);
		}
	}
	this.draw = function () {
		var x_ = Math.floor(this.p.v[0]);
		var y_ = Math.floor(this.p.v[1]);
		ctxCloud.fillStyle = "#fff";
		ctxCloud.fillRect(x_+wCloud/2,y_+hCloud/2,pixelSize,pixelSize);
	}
}

function windspeed(x,y,t) {
	var windDir = noise.simplex3(x/300,y/300,t)*Math.PI
	var windMag = noise.simplex3(x/300+6000,y/300+2000,t)/10
	return [windMag*Math.cos(windDir),windMag*Math.sin(windDir)]
}

var clouds = []

function addClouds(add) {
	for (var i = 0; i < add; i++) {
		clouds[clouds.length] = new cloud();
	}
}

function updateClouds() {
	toff+=0.01;
	for (var i = 0; i < clouds.length; i++) {
		clouds[i].update();
	}
	ctxCloud.clearRect(0, 0, wCloud, hCloud);
	for (var i = 0; i < clouds.length; i++) {
		clouds[i].draw();
	}
}

function cloudAnimTemp() {
	updateClouds();
	requestAnimationFrame(cloudAnimTemp);
}

generate();
addClouds(1000);// Remove
cloudAnimTemp();// later

function vect(v) {
	this.v = (v?v:[])
	this.mag = function () {
		var sum = 0;
		for (var i = 0; i < this.v.length; i++) {
			sum+=Math.pow(this.v[i],2);
		}
		return Math.pow(sum,1/2);
	}
	this.add = function (vect,coef) {
		if (!coef) coef = 1;
		for (var i = 0; i < this.v.length; i++) {
			this.v[i]+=vect.v[i]*coef
		}
	}
	this.throttle = function(speed) {
		var currMag = this.mag();
		if (currMag > speed) {
			for (var i = 0; i < this.v.length; i++) {
				this.v[i]*=speed/currMag
			}
		}
	}
}