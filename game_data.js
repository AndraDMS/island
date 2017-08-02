var g = { // General Game Data (Dev)
	cnv: { // Canvas References
		wrld: document.getElementById('world'),
		cld: document.getElementById('world_Clouds'),
		wthr: document.getElementById('world_Weather'),
	},

	pixelSize:2,
	clMap: {
		step: 1.3,
	 	weight: 1.2,
		size: 400,
		detail: 30,
		offset: -1000,
		flatten: 1.5,
	},
	
}

var s = { // Save Files
}

g.ctx = function (cnv_) { // Canvas Context References
	return this.cnv[cnv_].getContext('2d'); 
}

g.cnvImg = function (cnv_) { // Canvas Context References
	return this.ctx(cnv_).getImageData(0,0, this.cnv[cnv_].width, this.cnv[cnv_].height); 
}

g.cnvW = function (cnv_) { // Canvas Canvas Width
	return this.cnv[cnv_].width; 
}
g.cnvH = function (cnv_) { // Canvas Canvas Height
	return this.cnv[cnv_].height;
}