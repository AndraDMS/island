canvas = document.getElementById('world');
ctx = canvas.getContext('2d');
w = canvas.width;
h = canvas.height;

var imgdata = ctx.getImageData(0,0, w, h);
var imgdatalen = imgdata.data.length;

pixelSize = 2;

seed = Math.ceil(Math.random()*65536)
noise.seed(seed);

generate();
addClouds(2000);// Remove
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
