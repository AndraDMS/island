var biomeColoursMap = document.getElementById("biomeColour");
var biomeColours = [];
biomeColoursMap.crossOrigin = "";
biomeColoursMap.src += "?" + (new Date).getTime();
biomeColoursMap.onload = function () {
	var biomeColourCanvasTemp = document.createElement('canvas');
	var biomeColourCtxTemp = biomeColourCanvasTemp.getContext('2d');

	biomeColourCanvasTemp.width = biomeColoursMap.width;
	biomeColourCanvasTemp.height = biomeColoursMap.height;
	biomeColourCtxTemp.drawImage(biomeColoursMap, 0, 0, biomeColoursMap.width, biomeColoursMap.height);

	//document.body.appendChild(biomeColourCanvasTemp);

	biomeColours = biomeColourCtxTemp.getImageData(0,0, biomeColourCanvasTemp.width, biomeColourCanvasTemp.height).data;
}

var biomes = [new biome ("Ice Sheet",
		[-2000,-8],[-50,150],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[136,136,136,255]},
		{h:0.5,c:[106,106,106,255]},
		{h:1.5,c:[80,80,80,255]},
		{h:3,c:[150,163,161,255]},
		{h:4.5,c:[212,229,234,255]}]),
	new biome ("Tundra",
		[-8,-2],[-50,150],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[119,117,65,255]},
		{h:0.5,c:[51,66,34,255]},
		{h:1.5,c:[36,43,28,255]},
		{h:3,c:[150,163,161,255]},
		{h:4.5,c:[212,229,234,255]}],
		),
	new biome ("Taiga",
		[-2,3],[30,150],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[38,90,60,255]},
		{h:0.5,c:[26,57,63,255]},
		{h:1.5,c:[33,44,47,255]},
		{h:3,c:[94,116,122,255]},
		{h:4.5,c:[212,229,234,255]}],
		),
	new biome ("Temperate Broadleaf",
		[3,15],[30,150],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[50,104,48,255]},
		{h:0.5,c:[33,71,61,255]},
		{h:1.5,c:[39,54,49,255]},
		{h:3,c:[114,124,122,255]},
		{h:4.5,c:[157,179,185,255]}],
		),
	new biome ("Temperate Steppe",
		[-2,15],[-50,30],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[74,139,56,255]},
		{h:0.5,c:[40,94,70,255]},
		{h:1.5,c:[48,70,60,255]},
		{h:3,c:[56,66,52,255]},
		{h:4.5,c:[150,151,116,255]}],
		),
	new biome ("Dry Steppe",
		[15,24],[-50,30],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[126,133,71,255]},
		{h:0.5,c:[118,105,58,255]},
		{h:1.5,c:[152,128,79,255]},
		{h:3,c:[168,154,125,255]},
		{h:4.5,c:[201,188,162,255]}],
		),
	new biome ("Arid Desert",
		[24,100],[-50,10],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[255,250,184,255]},
		{h:0.5,c:[255,218,155,255]},
		{h:1.5,c:[255,191,139,255]},
		{h:3,c:[223,200,181,255]},
		{h:4.5,c:[178,172,167,255]}],
		),
	new biome ("Semiarid Desert",
		[24,100],[10,30],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[199,150,75,255]},
		{h:0.5,c:[171,135,71,255]},
		{h:1.5,c:[143,117,62,255]},
		{h:3,c:[135,117,78,255]},
		{h:4.5,c:[172,159,133,255]}],
		),
	new biome ("Grass Savannah",
		[15,24],[30,50],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[132,121,67,255]},
		{h:0.5,c:[79,83,39,255]},
		{h:1.5,c:[58,73,29,255]},
		{h:3,c:[76,84,60,255]},
		{h:4.5,c:[129,134,118,255]}],
		),
	new biome ("Tree Savannah",
		[15,24],[50,65],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[145,132,50,255]},
		{h:0.5,c:[111,126,44,255]},
		{h:1.5,c:[78,115,37,255]},
		{h:3,c:[92,109,74,255]},
		{h:4.5,c:[144,153,133,255]}],
		),
	new biome ("Mediterranean",
		[15,24],[65,80],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[102,140,70,255]},
		{h:0.5,c:[100,103,67,255]},
		{h:1.5,c:[145,121,78,255]},
		{h:3,c:[135,116,83,255]},
		{h:4.5,c:[141,130,109,255]}],
		),
	new biome ("Monsoon Forest",
		[15,24],[80,150],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[59,94,36,255]},
		{h:0.5,c:[39,66,22,255]},
		{h:1.5,c:[41,56,31,255]},
		{h:3,c:[58,69,51,255]},
		{h:4.5,c:[87,95,81,255]}],
		),
	new biome ("Xeric Shrubland",
		[24,100],[30,50],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[218,167,137,255]},
		{h:0.5,c:[189,148,123,255]},
		{h:1.5,c:[148,121,101,255]},
		{h:3,c:[117,99,85,255]},
		{h:4.5,c:[206,185,169,255]}],
		),
	new biome ("Subtropical Dry Forest",
		[24,100],[50,75],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[86,110,39,255]},
		{h:0.5,c:[90,99,38,255]},
		{h:1.5,c:[84,77,34,255]},
		{h:3,c:[97,92,63,255]},
		{h:4.5,c:[137,134,112,255]}],
		),
	new biome ("Subtropical Rainforest",
		[24,100],[75,90],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[44,132,32,255]},
		{h:0.5,c:[39,102,30,255]},
		{h:1.5,c:[20,70,13,255]},
		{h:3,c:[49,79,61,255]},
		{h:4.5,c:[91,137,110,255]}],
		),
	new biome ("Tropical Rainforest",
		[24,100],[90,150],
		[{h:-0.5,c:[23,66,145,255]},
		{h:0.0,c:[42,76,14,255]},
		{h:0.5,c:[33,66,13,255]},
		{h:1.5,c:[18,55,11,255]},
		{h:3,c:[40,65,36,255]},
		{h:4.5,c:[91,108,87,255]}],
		)

];

function biome(name,temp,hum,conds) {
	this.name = (name?name:"Land")
	this.temp = (temp?temp:[0,0]); // Temperature Bounds
	this.hum = (hum?hum:[0,0]); // Humidity Bounds
	this.conds = (conds?conds:[new cond()])
}

function cond(h,c) {
	this.h = (h?h:0.0)
	this.c = (c?c:[255,255,255,255])
}

function checkBiome(temp,hum) {
	var biome_ = "Not Biome"
	for (var l = 0; l < biomes.length; l++) {
		if (biomes[l].temp[0] <= temp && biomes[l].temp[1] > temp && biomes[l].hum[0] <= hum && biomes[l].hum[1] > hum) {
			biome_ = biomes[l].name
		} 
	}
	return biome_
}