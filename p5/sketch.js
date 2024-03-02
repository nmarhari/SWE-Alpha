//globals
// let start; //canvas for start screen
// let startVisible = true; // renders start screen once

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

function preload() {
	f = loadFont('inconsolata.otf');
	lava = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/lava.jpg');
	// this must be the static link of the asset (not '../assets/lava.jpg') -nassim
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  	start = createGraphics(windowWidth, windowHeight, WEBGL);
  	death = createGraphics(windowWidth, windowHeight, WEBGL);
	manager = new SceneManager();
	// Preload scenes. Preloading is normally optional
	// ... but needed if showNextScene() is used.
	manager.addScene ( startscene );
	manager.addScene ( gamescene );
	manager.showNextScene()
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

function draw()
{
    manager.draw();
}

function mousePressed()
{
    manager.handleEvent("mousePressed");
}

function keyPressed()
{
    manager.handleEvent("keyPressed");
}

function startscene()
{
  this.setup = function()
  {
    background(0); 
    fill('orange');
    textFont(f);
    textSize(60);
    textAlign(CENTER);
    text('Floor is Lava', 0, 0);
    text('press Enter to start', 0, 60)

  }
  this.keyPressed = function()
  {
    if(keyCode== ENTER){
      manager.showNextScene(); 
    }
  }
}
function gamescene()
{
	this.setup = function(){
		strokeWeight(0.04);
		textFont(f);
		textSize(12);
		ball = new FireBall(10, -20, 10, 2);
		player = new Player();
		maze = new Maze(22,12);
		maze.setPlayerAtStart(player);
		frameRate(60);
		strokeWeight(2);
	}
	this.keyPressed = function(){
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

	this.draw = function(){
		frameRate(60);
		background(0, 0, 51);

		if(frameCount % 30 === 0){
			maze.checkLavaCollision(player);
			ball.checkCollision(player);
		}


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

		// if (startVisible) {
		// 	startScreen();
		// 	startVisible = false; // render only once
		// }

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

	
	// if (startVisible) {
	// 	startScreen();
	// 	startVisible = false; // render only once
	// }

	this.mouseClicked = function(){
		if (!player.pointerLock) {
			player.pointerLock = true;
			requestPointerLock();
		} else {
			exitPointerLock();
			player.pointerLock = false;
		}
	}

}