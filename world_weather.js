
var defSnowColour = [156,205,222,255]
var snowConds = [{h:0.0,c:[201,234,245,255]},{h:0.5,c:[129,188,207,255]},{h:1.5,c:[176,224,240,255]},{h:3,c:[210,238,247,255]},{h:4.5,c:[240,249,252,255]}]

function weatherGenerate() {
	g.ctx("wthr").clearRect(0, 0, g.cnvW("wthr"), g.cnvH("wthr"));
	for (var i = -g.cnvW("wthr")/2; i <= g.cnvW("wthr")/2; i+=g.pixelSize) {
		for (var j = -g.cnvH("wthr")/2; j <= g.cnvH("wthr")/2; j+=g.pixelSize) {

			var altitude = g.clMap.alt(i,j);
			var temperature = g.clMap.temp(i,j);
			var humidity = g.clMap.hum(i,j);

			var output = defSnowColour;
			
			if (temperature <= 0 && humidity >= 25 && altitude > -9) {
				for (var k = 0; k < snowConds.length; k++) {
					if (altitude > snowConds[k].h) {
						output = snowConds[k].c
					}
				}	
				g.ctx("wthr").fillStyle = "rgba(" + output[0] + "," + output[1] + "," + output[2] + "," + output[3] + ")"
				g.ctx("wthr").fillRect(i+g.cnvW("wthr")/2,j+g.cnvH("wthr")/2,g.pixelSize,g.pixelSize);
			}
		}
	}
}
