
canvasCursor = document.getElementById('world_Cursor');
ctxCursor = canvasCursor.getContext('2d');
wCursor = canvasCursor.width;
hCursor = canvasCursor.height;

canvasCursor.addEventListener('mousemove', function(e) {
	ctxCursor.clearRect(0, 0, wCursor, hCursor);
	ctxCursor.fillStyle = "#ddd";
	var bounds = canvasCursor.getBoundingClientRect();
	var x_ = e.clientX-bounds.left;
	var y_ = e.clientY-bounds.top;
	ctxCursor.fillRect(Math.round(x_)-12,Math.round(y_)-1,24,2);
	ctxCursor.fillRect(Math.round(x_)-1,Math.round(y_)-12,2,24);
	//console.log(e)

	x_ -= wCursor/2;
	y_ -= hCursor/2;

	var alt_ = g.clMap.alt(x_,y_);//
	var temp_ = g.clMap.temp(x_,y_);
	var hum_ = g.clMap.hum(x_,y_);
	var biome_ = checkBiome(temp_,hum_);

	document.getElementById("world_Info").innerHTML = "X: " + x_ + ", Y: " + y_ + "</br> Altitude: " + Math.round(1000*alt_) + "m</br> Avg Temp: " + temp_.toFixed(3) + "C</br> Humidity: " + hum_.toFixed(3) + "%</br> Biome: " + biome_;
})

canvasCursor.addEventListener('mouseout', function(e) {
	ctxCursor.clearRect(0, 0, wCursor, hCursor);
})

function tN(i,n) { // to nearest
	return n*Math.round(i/n)
}