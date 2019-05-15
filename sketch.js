/****************************** Banner *******************************/

const IMG_SKY = DIR_IMG + "sky.png";
	  IMG_SEA = DIR_IMG + "sea.png";
	  IMG_TXT = DIR_IMG + "txt.png";
	  
const ANM_SKY_IN  = 0,
	  ANM_SEA_IN  = 1,
	  ANM_TXT_IN  = 2,
	  ANM_SKY_OUT = 3,
	  ANM_SEA_OUT = 4;
	  
var   canvas, grid,
	  imgSky, imgSea, imgTxt,
	  skySiz, seaSiz, txtSiz,
	  skyPos, seaPos, txtPos;
	  
var   sldAli, sldCoh, sldSep;
	  
var   anim = 0; 

var   flock = [];
	 
  
function preload() {
	imgSky = loadImage(IMG_SKY);
	imgSea = loadImage(IMG_SEA);
	imgTxt = loadImage(IMG_TXT);
}
  
function setup() {

	canvas = createCanvas(800, 325);
	canvas.parent("#banner");
	
	for (var entry of entries)
		createProject(entry);
	
	skySiz = createVector(800,225);
	seaSiz = createVector(800,100);
	txtSiz = createVector(800,225);
	
	skyPos = createVector(0, -skySiz.y);
	seaPos = createVector(0, height);
	txtPos = createVector(-txtSiz.x, height - (seaSiz.y + txtSiz.y));
	
	sldAli = sldCoh = sldSep = createSlider(0,5,1,0.05);
	sldAli.style("display", "none");
	
}

function draw() {

	background(255);

	if (anim != -1) {
		this.displayImages();
		this.animate(3);
	}
	else 
		for (var b of flock) {
			b.ACS(flock);
			b.update();
			b.display({ fov: false, vel: false, walls: false });
		}
}

function animate(step) {
	
	switch (anim) {
		
		case ANM_SKY_IN:
			if (skyPos.y < 0) {
				skyPos.y += step;
				if (skyPos.y >= 0) {
					skyPos.y = 0;
					anim = ANM_TXT_IN;
				}
			}
			break;
			
		case ANM_TXT_IN:
			if (txtPos.x < 0) {
				txtPos.x += (3 * step);
				if (txtPos.x >= 0) {
					txtPos.x = 0;
					anim = ANM_SEA_IN;
				}
			}
			break;
			
		case ANM_SEA_IN:
			if (seaPos.y > 225) {
				seaPos.y -= step;
				if (seaPos.y <= skySiz.y) {
					seaPos.y = skySiz.y;
					anim = ANM_SKY_OUT;
				}
			}
			break;
			
		case ANM_SKY_OUT:
			if (skyPos.y > -skySiz.y) {
				skyPos.y  -= step;
				if (skyPos.y <= -skySiz.y) {
					skyPos.y = -skySiz.y;
					anim = ANM_SEA_OUT;
				}
			}
			break;

		case ANM_SEA_OUT:
			if (seaPos.y < height) {
				seaPos.y += step;
				if (seaPos.y >= height) {
					seaPos.y = height;
					anim = -1;
				}
			}
			break;
			
		default:
			break;
		
	}
	
	if (anim == -1) {
		grid  = this.getPixels(canvas);
		flock = this.generateFlock(grid, 10);
	}
	
}
	 
function displayImages() {
	
	image(imgSky, skyPos.x, skyPos.y);
	image(imgSea, seaPos.x, seaPos.y);
	image(imgTxt, txtPos.x, txtPos.y);
	
	/*noFill();
	stroke(0,0,255);
	rect(skyPos.x, skyPos.y, skySiz.x, skySiz.y);
	stroke(0);
	rect(seaPos.x, seaPos.y, seaSiz.x, seaSiz.y);
	stroke(255,0,0);
	rect(txtPos.x, txtPos.y, txtSiz.x, txtSiz.y);*/
	
}	

function getPixels() {
	
	var g = new Array(height);
	for (var row = 0; row < height; row++)
		g[row] = new Array(width);
	
	loadPixels();
	console.log(pixels);
	var c,
		d = pixelDensity(),
		l = 4 * (width * d) * (height * d);
	
	var index, x, y;
	for (var i = 0; i < l; i += 4) {
		index = i / 4;
		x       = floor(index / (width * d));
		y       = (index / d) % width;
		g[x][y] = floor(red(pixels[i]) / 255);
	}
	updatePixels();
	
	return g;	
}

function generateFlock(g, s) {
	
	var f = [];
	for (var i = 0; i < height; i += s)
		for (var j = 0; j < width; j += s)
			if (g[i][j] == 0) {
				b = new Boid(i, j, 10, 0);
				b.size = s;
				f.push(b);
			}		
	console.log(f.length);
	return f;
	
}