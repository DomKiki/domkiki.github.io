/***************************** Projects ******************************/

const MATHS = "mathsSimulations",
	  GAMES = "gamesReproductions",
	  LIBS  = "librariesExamples";

const JPG = ".jpg",
	  PNG = ".png",
	  GIF = ".gif";

const DIR_PRJ = "./projects/",
	  DIR_TMB = "./thumbnails/",
	  DIR_IMG = "./img/",
	  GITHUB  = "https://github.com/DomKiki/";

var entries = [ makeEntry("Life",                "GameOfLife",      MATHS, [PNG, GIF], "One Automaton to rule them all !",                                      "life.html",      "GameOfLife"),  
				makeEntry("DFT Paint",           "FourierPaint",    MATHS, [JPG],      "Convert a path into epicycles using Discrete Fourier Transform",        "paint.html",     "DFT-Paint"),
				makeEntry("Fractal Clock",       "FractalClock",    MATHS, [PNG],      "Looking at a clock made entertaining ?!",                               "clock.html",     "FractalClock"),
				makeEntry("Boid Flock",          "BirdFlock",       MATHS, [PNG, GIF], "Watch flocking behaviour emerge from 3 simple rules",                   "flock.html",     "BirdFlock"),
				makeEntry("Langton's Ant",       "LangtonAnt",      MATHS, [PNG, GIF], "Play with the settings and discover amazing patterns of Langton's Ant", "langton.html",   "Langton-Ant"),
				makeEntry("Tesseract",           "Tesseract",       MATHS, [PNG, GIF], "Explore the 4th dimension by rotating a hypercube",                     "tesseract.html", "Tesseract"),
				makeEntry("Mandelbrot Explorer", "FractalExplorer", MATHS, [PNG, GIF], "Visual Interactive tool to explore Mandelbrot / Julia sets",            "fractal.html",   "FractalExplorer"),
				makeEntry("2048",                "2048",            GAMES, [PNG, GIF], "Sliding Puzzle game",                                                   "2048.html",      "2048"),
				makeEntry("Snake",               "Snake",           GAMES, [PNG, GIF], "Retro game revisited",                                                  "snake.html",     "Snake")
];

function makeEntry(t, di, p, tmb, des, dem, src) {
	return { title:       t,
			 dir:         di,
			 par:         p,
			 thumbnail:   tmb,
			 description: des,
			 demo:        dem,
			 source:      src };
}

function createProject(entry) {
	
	var root    = document.getElementById(entry.par);
	var content = root.querySelector(".content");
	
	var project = document.createElement('A');
	project.href = DIR_PRJ + entry.dir + "/" + entry.demo;
	project.className = "project";
		
	var header = document.createElement('DIV');
	header.className = "project-header";
	
	var thumbnail = document.createElement('DIV');
	thumbnail.className = "project-thumbnail";
	var thumbnailURL    = DIR_TMB + "/" + entry.dir;
	thumbnail.style     = "background-image: url('" + thumbnailURL + entry.thumbnail[0] + "')";
	if (entry.thumbnail.includes(GIF)) {
		thumbnail.addEventListener("mouseover", function() { this.style = "background-image: url('" + thumbnailURL + GIF + "')"; });
		thumbnail.addEventListener("mouseout",  function() { this.style = "background-image: url('" + thumbnailURL + entry.thumbnail[0] + "')";});
	}
	
	var h3 = document.createElement('H3');
	h3.innerHTML = entry.title;
	
	var description = document.createElement('DIV');
	description.className = "project-description";
	
	var descriptionP = document.createElement('P');
	descriptionP.innerHTML = entry.description;
	
	var buttons = document.createElement('DIV');
	buttons.className = "buttons";
		
	var source = document.createElement('A');
	source.className = "small";
	source.href = GITHUB + entry.source;
	source.innerHTML = "Source";
	
	// Russian dolls
	header.appendChild(thumbnail);
	header.appendChild(h3);
	description.appendChild(descriptionP);
	project.appendChild(header);
	project.appendChild(description);
	project.appendChild(source);
	content.appendChild(project);
	
}

/****************************** Navigation ***************************/
	
var navProjects, navAboutMe;

$(document).ready(function() {

	displayProjects();
	
});

function displayProjects() {
	
	$("#welcome").addClass("hidden");
	$("#projects").removeClass("hidden");
	//$("#aboutMe").addClass("hidden");
}

/***************************** Entry point ***************************/

for (var e of entries)
	createProject(e);