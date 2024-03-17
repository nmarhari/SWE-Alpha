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

var player, maze, f, help = false, canvas;
let book, bookModel;

function preload() {
	f = loadFont('inconsolata.otf');
	lava = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/lava.jpg');
	bookModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/book.obj');
	// this must be the static link of the asset (not '../assets/lava.jpg') -nassim
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  	start = createGraphics(windowWidth, windowHeight, WEBGL);
  	death = createGraphics(windowWidth, windowHeight, WEBGL);
	soundFormats('mp3', 'wav');
	walking = loadSound('assets/walking.mp3');
	hit = loadSound('assets/hit.wav'); 
	scream = loadSound('assets/scream.wav'); 
  	strokeWeight(0.04);
 	textFont(f);
 	textSize(12);
  	ball = new FireBall(10, -20, 10, 2);
  	player = new Player();
  	maze = new Maze(22,12);
 	maze.setPlayerAtStart(player);
	book = new Collectible("Nesterenko's C++ Book", 95, -3.5, 30, 10, bookModel);
 	frameRate(60);
  	strokeWeight(2);

	  word = new Word3D(
		"P5.3D",       // The actual character that you want to draw (anything that can be passed into "text()")
		1.5,             // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
		windowWidth/2000,     // The size of a unit "box()" making up part of the letter  
		35,            // The size of the canvas it renders the letter on (higher is more detailed, 30-40 is a good range)  
		true,          // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
		"Arial",     // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
		BOLD           // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
	  );
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

  	if(frameCount % 60 === 0){
      	maze.checkLavaCollision(player);
		ball.checkCollision(player);
  	}

	  	if(dist(player.position.x, player.position.y, player.position.z, book.position.x, book.position.y, book.position.z) < 2){
			player.collect(book);
			book.remove();
		} else {
			book.display();
		}
	
	
push();
		word.show();


		translate(0, 0, -5);
		pop();
	maze.update();
	maze.display();
	player.update();
	ball.display();
	ball.update(player);
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
	}
}

