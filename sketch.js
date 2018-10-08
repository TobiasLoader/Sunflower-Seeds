
// Declare VAR'S up here

var rot;
var modulus;
var argument;
var pollenCount;
var pollenSize;
var pollenDist;

var resized;
var sliderH;
var sliderXConst;
var hold;
var clicked;

var play;
var playPrev;
var cursorType;

var S;

function setup() {
  // put setup code here
  // Initialize VAR'S here (give them values)
  angleMode(DEGREES);
  W = window.innerWidth;
	H = window.innerHeight;
  canvas = createCanvas(W, H);
  resized = false;
  
  if (H>800){
		sliderH = 19*H/20;
	} else {
		sliderH = H - 50;
	}
	sliderXConst = W*(19/20);
	hold = false;
	clicked = false;
	play = false;
	
	rot = 0.61803398874989;
  pollenCount = 100;
  pollenSize = 20;
  pollenDist = 10
  
  cursorType = "default";
  
  if (W>H){
		S = W;
	} else {
		S = H;
	}
  
  textAlign(CENTER);
  textFont("Avenir Next",15);
  
  initFuncs();
  slider();
  
}
function initFuncs(){
	background(159, 206, 136);
	drawPollen();
	if (play){
		drawStop();
	} else {
		drawPlay();
	}
}

function draw() {
	if (mouseIsPressed || resized || playPrev){
		initFuncs();
		slider();
		resized = false;
	}
	interaction();
	cursor(cursorType);
	playPrev = play;
}

function interaction(){
	if (play){
		if (rot<1){
			rot += 0.0001;
		} else {
			play = false;
		}
	}
	if (resized || mouseX !== pmouseX || mouseY !== pmouseY){
		if (dist(mouseX,mouseY,(sliderXConst-S/20)*rot+S/20,sliderH)<20 && mouseX>S/20 && mouseX<sliderXConst){
			cursorType = "ew-resize";
			if (mouseIsPressed){
				hold = true;
			} else {
				hold = false;
			}
		} else if(dist(mouseX,mouseY,(sliderXConst-S/20)*rot+S/20,sliderH)<20 && hold===false) {
			cursorType = "ew-resize";
		} else {
			cursorType = "default";
		}
	}
	if (mouseX>S/40 && mouseX<3*S/40 && mouseY>S/40 && mouseY<3*S/40){
		cursorType = "pointer";
	}
}

function drawPollen(){
	fill(237,192,62);
	stroke(197,132,42);
	for (var i=0; i<pollenCount; i+=1){
		modulus = (2*pollenDist+i/10*pollenDist);
		argument = i*(360*rot);
		ellipse(W/2+modulus*sin(argument),H/2+modulus*cos(argument),pollenSize,pollenSize);
	}
}
function drawPlay(){
	fill(255,75);
	noStroke();
	rect(S/40,S/40,S/20,S/20,S/400);
	fill(255);
	triangle(S/24,19*S/480,S/24,29*S/480,7*S/120,S/20);
}
function drawStop(){
	fill(255,75);
	noStroke();
	rect(S/40,S/40,S/20,S/20,S/400);
	fill(255);
	rect(S/24,9*S/240,S/240,S/48);
	rect(7*S/120-S/240,9*S/240,S/240,S/48);
}

function slider(){
	stroke(255);
	line(W/20,sliderH,sliderXConst,sliderH);
	line(W/20,sliderH-5,W/20,sliderH+5);
	line(sliderXConst,sliderH-5,sliderXConst,sliderH+5);
	fill(255);
	ellipse((sliderXConst-W/20)*rot+W/20,sliderH,40,40);
	fill(255);
	noStroke();
	text(roundSF(rot,5),(sliderXConst-W/20)*rot+W/20,sliderH-30);
	if (hold){
		rot = (mouseX-W/20)/(sliderXConst-W/20);
	}
	if (mouseX<W/20 || mouseX>sliderXConst){
		hold = false;
	}
}
function roundSF(n,sf){
	return round(pow(10,sf)*n)/pow(10,sf);
}

window.onresize = function() {
  W = window.innerWidth;
	H = window.innerHeight;
  canvas.size(W,H);
  resized = true;
  if (H>800){
		sliderH = 19*H/20;
	} else {
		sliderH = H - 50;
	}
	sliderXConst = W*(19/20);
	if (W>H){
		S = W;
	} else {
		S = H;
	}
};

function mouseReleased(){
	hold = false;
}
function mouseClicked(){
	if (mouseX>S/40 && mouseX<3*S/40 && mouseY>S/40 && mouseY<3*S/40){
		if (play === true){
			play = false;
			drawPlay();
		} else {
			play = true;
		}
	}
}
// Other functions down here