
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

	document.getElementById("world_Info").innerHTML = "X: " + x_ + ", Y: " + y_ + "</br> Altitude: " + Math.round(1000*heightMap(x_,y_,1.3,1.2,500,30,-1000,1.5)) + "m</br> Avg Temp: " + temperatureMap(x_,y_,1.3,1.2,500,30,-1000,1.5).toFixed(3) + "C";
})

canvasCursor.addEventListener('mouseout', function(e) {
	ctxCursor.clearRect(0, 0, wCursor, hCursor);
})

function tN(i,n) { // to nearest
	return n*Math.round(i/n)
}