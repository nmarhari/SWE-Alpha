//globals
let start; //canvas for start screen
let startVisible = true; // renders start screen once

let death;
let deathVisible = false;

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
// ^ sleep for adding in delays, ex:  async function(){... await sleep(Xms); ... } 

// this is needed to catch the exit from pointerLock when user presses ESCAPE
function onPointerlockChange() {
	if (document.pointerLockElement === canvas.elt ||
		document.mozPointerLockElement === canvas.elt)
		console.log("locked");
	else {
		console.log("unlocked");
		player.pointerLock = false;
	}
}
document.addEventListener('pointerlockchange', onPointerlockChange, false);

var player, map, f, help = false, canvas;

function preload() {
	f = loadFont('inconsolata.otf');
	lava = loadImage('../assets/lava.jpg');
	// this must be the static link of the asset (not '../assets/lava.jpg') -nassim
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  	start = createGraphics(windowWidth, windowHeight, WEBGL);
  	death = createGraphics(windowWidth, windowHeight, WEBGL);

  	strokeWeight(0.04);
 	textFont(f);
 	textSize(12);
  	player = new Player();
  	map = new GeneratedMap(1);
 	map.setPlayerAtStart(player);
 	frameRate(60);
  	strokeWeight(2);
}

// viewport resize when window size changes
window.addEventListener('resize', async function(event){
  await sleep(10); // wait 10 ms for screen to report right value

  resizeCanvas(windowWidth, windowHeight); // resizes p5js canvas

  startDiv.size(windowWidth, windowHeight); // resizes start overlay
  startTitle.position(windowWidth/2/2, 40);
  startCheck.position(windowWidth/2/2, 200);
  startButton.position(windowWidth/2/2, 250);
});

function keyPressed() {
	if (key == 'h') help = !help;
	if(key=='+'){
		player.pov.fovy -= 0.1;
		player.updatePOV();
	}
	if(key=='-'){
		player.pov.fovy += 0.1;
	player.updatePOV();
	}
}

function draw() {
	frameRate(60);
  	background(0, 0, 51);

  	if(frameCount % 30 === 0){
      	map.checkLavaCollision(player, 1);
		
  	}


	map.update(1);
	//maze.display();
	map.display(1);
	player.update();
	//drawAxes();
  	if (help || frameCount < 400) { // Heads Up Display extension by jWilliam
		push(); // this affects the frame rate
		camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
		ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
		fill(0, 0, 0, 200);
		noStroke();
		translate(-380, -380, 0);
		scale(2);
		rect(0, 0, 140, 85);
		fill(127);
		text('mouse: left/right : pan', 10, 10);
		text('       up/down : tilt', 10, 20);
		text('       click : ptrlock', 10, 30);
		text(' keys: a/d : left/right', 10, 40);
		text('       w/s : fwd/bkwd', 10, 50);
		text('       e/q : up/down', 10, 60);
		text('       space : jump', 10, 70);
		text('       h : help', 10, 80);
		pop();
}

	if (startVisible) {
		startScreen();
		startVisible = false; // render only once
	}

}

if (help || frameCount < 400) { // Heads Up Display extension by jWilliam
	push(); // this affects the frame rate
	camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
	ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
	fill(0, 0, 0, 200);
	noStroke();
	translate(-380, -380, 0);
	scale(2);
	rect(0, 0, 140, 85);
	fill(127);
	text('mouse: left/right : pan', 10, 10);
	text('       up/down : tilt', 10, 20);
	text('       click : ptrlock', 10, 30);
	text(' keys: a/d : left/right', 10, 40);
	text('       w/s : fwd/bkwd', 10, 50);
	text('       e/q : up/down', 10, 60);
	text('       space : jump', 10, 70);
	text('       h : help', 10, 80);
	pop();
}

  
if (startVisible) {
	startScreen();
	startVisible = false; // render only once
}


  

	// function drawAxes(){
	// 	push();
	//       noStroke();
	// 	  fill(127,0,0); // X red
	// 	  translate(75,0.5,0.5);
	// 	  box(150,1,1);
	// 	pop();
	// 	push();
	//       noStroke();
	// 	  fill(0,127,0); // Y green
	// 	  translate(0.5,75,0.5);
	// 	  box(1,150,1);
	// 	pop();
	// 	push();
	//       noStroke();
	// 	  fill(0,0,127); // Z blue
	// 	  translate(0.5,0.5,75);
	// 	  box(1,1,150);
	// 	pop();
	// }

	function mouseClicked() {
	if (!player.pointerLock) {
		player.pointerLock = true;
		requestPointerLock();
	} else {
		exitPointerLock();
		player.pointerLock = false;
	}
}