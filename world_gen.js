
var defColour = [29,50,88,0]
var conds = [{h:-0.5,c:[23,66,145,255]},/*{h:0.0,c:[245,233,206,255]},*/{h:0.0,c:[97,184,72,255]},{h:0.5,c:[51,125,92,255]},{h:1.5,c:[63,93,80,255]},{h:3,c:[150,163,161,255]},{h:4.5,c:[206,236,245,255]}]

function refresh() {
	seed = Math.ceil(Math.random()*65536)
	noise.seed(seed);
	generate();
}

function generate() {
	console.log("Start: " + (new Date).getTime());
	for (var i = -g.cnvW("wrld")/2; i <= g.cnvW("wrld")/2; i+=g.pixelSize) {
		for (var j = -g.cnvH("wrld")/2; j <= g.cnvH("wrld")/2; j+=g.pixelSize) {

			var height = g.clMap.alt(i,j);
			
			var temperature = g.clMap.temp(i,j);
			//ctxTemp.fillStyle = "rgba(" + Math.round(255*(temperature-5)/20) + ",0," + Math.round(255-255*(temperature-5)/20) + ",1)";
			//ctxTemp.fillRect(i+wTemp/2,j+hTemp/2,pixelSize,pixelSize);
			
			var humidity = g.clMap.hum(i,j);
			//ctxHum.fillStyle = "rgba(" + Math.round(255*(humidity)/100) + ",0," + Math.round(255-255*(humidity)/100) + ",1)";
			//ctxHum.fillRect(i+wHum/2,j+wHum/2,pixelSize,pixelSize);
			

			//for (var k = 1; k < detail; k++) {
				//offset += seed + k*25;
				//mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k);
			//}

			//mag/=flatten;


			var output = defColour;
			//if (mag>=60) output = "rgb(" + mag + "," + mag + "," + mag + ")";
			var inBiomes = false;
			for (var l = 0; l < biomes.length; l++) {
				if (biomes[l].temp[0] <= temperature && biomes[l].temp[1] > temperature && biomes[l].hum[0] <= humidity && biomes[l].hum[1] > humidity) {
					for (var k = 0; k < biomes[l].conds.length; k++) {
						if (height > biomes[l].conds[k].h) {
							output = biomes[l].conds[k].c
						}
					}	
					inBiomes = true;
				} 
			}
			if (!inBiomes) {
				for (var k = 0; k < conds.length; k++) {
					if (height > conds[k].h) {
						output = conds[k].c
					}
				}	
			}
			
			for (var k = 0; k < Math.pow(g.pixelSize,2); k++) {
				imgdata.data[4*((j+g.cnvH("wrld")/2+Math.floor(k/g.pixelSize))*g.cnvW("wrld")+i+g.cnvW("wrld")/2+(k%g.pixelSize))] = output[0];
				imgdata.data[4*((j+g.cnvH("wrld")/2+Math.floor(k/g.pixelSize))*g.cnvW("wrld")+i+g.cnvW("wrld")/2+(k%g.pixelSize))+1] = output[1];
				imgdata.data[4*((j+g.cnvH("wrld")/2+Math.floor(k/g.pixelSize))*g.cnvW("wrld")+i+g.cnvW("wrld")/2+(k%g.pixelSize))+2] = output[2];
				imgdata.data[4*((j+g.cnvH("wrld")/2+Math.floor(k/g.pixelSize))*g.cnvW("wrld")+i+g.cnvW("wrld")/2+(k%g.pixelSize))+3] = output[3];
			}
		}
	}
	console.log("End: " + (new Date).getTime());
	ctx.putImageData(imgdata,0,0)
	console.log("Print: " + (new Date).getTime());
	weatherGenerate();
}

g.clMap.alt = function (i,j) {
	var step = g.clMap.step;
	var weight = g.clMap.weight;
	var size = g.clMap.size;
	var detail = g.clMap.detail;
	var offset = g.clMap.offset;
	var flatten = g.clMap.flatten;
	var mag = 0;

	for (var k = 1; k < detail; k++) {
		offset += seed + k*25;
		mag += (noise.simplex2((i-offset)*Math.pow(step,k)/size,(j-offset)*Math.pow(step,k)/size))*7/Math.pow(weight,k);
	}

	mag/=flatten;
	mag-=Math.pow(dist(i,j)/(g.cnvH("wrld")/3),7);
	if (mag>=0) mag = Math.pow(mag/3.5,1.8)
	else mag = -Math.pow(-mag/3.5,1.8)

	if (mag < -10) mag = -10
	return mag;
}

function dist(x,y) {
	return Math.pow(x*x+y*y,1/2)
}

toff = 0;
function cloud() {
	this.s = Math.ceil(Math.random()*2) // Size
	this.p = new vect([Math.random()*g.cnvW("wrld")-g.cnvW("wrld")/2,Math.random()*g.cnvH("wrld")-g.cnvH("wrld")/2]);
	var randomTheta = (Math.random()*2-1)*Math.PI
	this.v = new vect([Math.cos(randomTheta),Math.sin(randomTheta)])
	this.a = new vect([0,0])
	this.update = function () {
		this.a = new vect(windspeed(this.p.v[0],this.p.v[1],toff))
		this.v.add(this.a);
		this.v.throttle(.3);
		this.p.add(this.v);
		if (dist(this.p.v[0],this.p.v[1]) > g.cnvH("cld")/2.2) {
			this.p = new vect([-this.p.v[0]*0.8,-this.p.v[1]*0.8]);
		}
	}
	this.draw = function () {
		var x_ = g.pixelSize*Math.floor(this.p.v[0]/g.pixelSize);
		var y_ = g.pixelSize*Math.floor(this.p.v[1]/g.pixelSize);
		ctxCloud.fillStyle = "#fff";
		ctxCloud.fillRect(x_+g.cnvW("cld")/2,y_+g.cnvH("cld")/2,g.pixelSize*this.s,g.pixelSize*this.s);
	}
}
