
canvasCloud = document.getElementById('world_Clouds');
ctxCloud = canvasCloud.getContext('2d');
wCloud = canvasCloud.width;
hCloud = canvasCloud.height;

function windspeed(x,y,t) {
	var windDir = noise.simplex3(x/300,y/300,t)*2*Math.PI
	windDir += noise.simplex3(x/50-6000,y/50-2000,t)
	var windMag = (noise.simplex3(x/50+6000,y/50+2000,t)+1)/160
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
