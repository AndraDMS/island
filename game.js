canvas = document.getElementById('world');
ctx = canvas.getContext('2d');

w = canvas.width;
h = canvas.height;

var imgdata = ctx.getImageData(0,0, w, h);
var imgdatalen = imgdata.data.length;

feig = 4.669201609102990671853203821578;

function altCond(h,c,elem) {
	this.h = (h?h:0)
	this.c = (c?c:[0,0,0,0])
	//this.elem = 
}

var defColour = [29,50,88,255]
var conds = [{h:-2,c:[23,66,145,255]},{h:0.0,c:[245,233,206,255]},{h:0.5,c:[97,184,72,255]},{h:2.2,c:[51,125,92,255]},{h:4.3,c:[63,93,80,255]},{h:7,c:[150,163,161,255]},{h:8,c:[206,236,245,255]}]

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
	for (var i = 0; i <= w; i+=pixelSize) {
		for (var j = 0; j <= h; j+=pixelSize) {
			/*var mag = (noise.simplex2(i/100,j/100))*2;
			mag += (noise.simplex2(i/50,j/50))
			mag += (noise.simplex2(i/20,j/20))
			mag += (noise.simplex2(i/5,j/5))/3
			mag += (noise.perlin2(i/200,j/200))*5*/

			var mag = 0;
			var step = 1.3;
			var weight = 1.2;
			var size = 500;
			var detail = 30;
			var offset = -1000;
			var flatten = 1.5;

			//noise.seed(seed)

			for (var k = 1; k < detail; k++) {
				offset += seed + k*25
				//noise.seed(1+((seed+(k*256))%65536))
				mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k)
			}

			mag/=flatten;
			mag-=Math.pow(dist(i-(w/2),j-(h/2))/(h/3),9);

			var output = defColour;
			//if (mag>=60) output = "rgb(" + mag + "," + mag + "," + mag + ")";
			for (var k = 0; k < conds.length; k++) {
				if (mag > conds[k].h) {
					output = conds[k].c
				}
			}
			//ctx.fillStyle = output;
			//ctx.fillRect(i, j, pixelSize, pixelSize);
			for (var k = 0; k < Math.pow(pixelSize,2); k++) {
				imgdata.data[4*((j+Math.floor(k/pixelSize))*w+i+(k%pixelSize))] = output[0];
				imgdata.data[4*((j+Math.floor(k/pixelSize))*w+i+(k%pixelSize))+1] = output[1];
				imgdata.data[4*((j+Math.floor(k/pixelSize))*w+i+(k%pixelSize))+2] = output[2];
				imgdata.data[4*((j+Math.floor(k/pixelSize))*w+i+(k%pixelSize))+3] = output[3];
			}
		}
	}
	console.log("End: " + (new Date).getTime());
	ctx.putImageData(imgdata,0,0)
	console.log("Print: " + (new Date).getTime());
}

function dist(x,y) {
	return Math.pow(x*x+y*y,1/2)
}

generate();