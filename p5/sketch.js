//globals
// fireball and fireball particle arrays
const balls = [], ballParticles = []; 
let numParticles = 10, numberOfBalls = 50, currentBalls = 0; // numbers for particles and fireballs on screen

// basic game variables
var player, maze, f, help = false, canvas, themePlaying = false, dlzMode = false;;

// for models on screen and skybox
let book, bookModel, skybox, theme, aspen; 
let OBJarray = []; //have to splice objs from array to remove on screen
// overlay
let startVisible = true; // renders start screen once
let deathVisible = false;
let startShowingHealth = false;
let startcreateInventory = false;

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

function preload() {
	f = loadFont('inconsolata.otf');
	lava = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/pixel.jpg');
	meteorite = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/meteorite.jpg');

	bookTexture = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/leather.jpg');
	wordTexture = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/molten.jpg');
	//chairTexture = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/fabric.png');
	//laptopTexture = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/macScreen.jpg');

	rock = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/rock.jpg');
	metal = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/metal.jpg');
	brick = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/brick.jpg');
	skybox = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/sky.jpg');
	aspen = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/aspen.png');


	// Load the collectables
	bookTexture = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/leather.jpg');
	bookModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/book.obj');


	//chairModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/Chair.obj');
	//laptopModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/laptop.obj');
	////laptopModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/laptop.obj');
	drModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/Prof.obj');

	// this must be the static link of the asset (not '../assets/lava.jpg') -nassim

	// have to preload so it can play when starting the game
	theme = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/Theme_Song.mp3'); 
	ambience = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/ambience.mp3');
	lavaSound = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/lava.mp3');

	walking = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/walking-trimmed.mp3');
	hit = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/hit.mp3'); 
	scream = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/scream.wav');
	/* // for moving lava
	 lava = createVideo(['../assets/lava.mp4']);
	//lava.elt.muted = true;
	lava.loop();
	lava.hide();  */
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	soundFormats('mp3', 'wav');
	walking = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/walking-trimmed.mp3');
	hit = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/hit.mp3'); 
	scream = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/scream.wav'); 
	ambience = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/ambience.mp3');
	lavaSound = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/lava.mp3');

	ambience.setVolume(.3);
	lavaSound.setVolume(1.2);

  	strokeWeight(0.04);
 	textFont(f);
 	textSize(12);

	for (let i = 0; i < numberOfBalls; i++) {
		balls.push(new FireBall(10, random(-30, 100), 10, 2));
	}

  	player = new Player();
  	maze = new Maze(20,12);
 	maze.setPlayerAtStart(player);
	book = new Book("Book", 35, -5, 30, 10, bookModel);
	dr = new Collectible("Delozier", 90, -6, 4.5, 1.4, drModel);

  	strokeWeight(2);
	
	  word = new Word3D(
		"Kent Touch This",       // The actual character that you want to draw (anything that can be passed into "text()")
		1.5,             // How thick the 3D rendered letter is (i.e. how many cube pixels of size "size" it is on z-axis)  
		windowWidth/3000,     // The size of a unit "box()" making up part of the letter  
		35,            // The size of the canvas it renders the letter on (higher is more detailed, 30-40 is a good range)  
		true,          // [OPTIONAL, default = true] Gives the bevelled, embossed 3D look (as seen in screenshot)  
		"Arial",     // [OPTIONAL, default = "Georgia"] Gives the font uses, can be any default ones or anything added  
		BOLD           // [OPTIONAL, default = BOLD] Gives the chosen style out of BOLD, NORMAL, ITALIC  
	  );
	
	initContainerHTML();
	// initialize container in html for overlay elements

	if (startVisible) {
		startScreen();
		//theme.loop();
		startVisible = false; // render only once
	}
}

// viewport resize when window size changes
window.addEventListener('resize', async function(event){
  await sleep(10); // wait 10 ms for screen to report right value

  resizeCanvas(windowWidth, windowHeight); // resizes p5js canvas
});

function draw() {
	frameRate(60);
  	background(0,0,51);

	// for 3d kent touch this sign
	push();
		rotateY(-HALF_PI)
		translate(45, -30, -175)
		noStroke();
		texture(wordTexture);
		word.show()
	pop()

	 // starry skybox
	push();
		noStroke();
		textureWrap(CLAMP);
		texture(skybox);
		translate(50, 0, 100);
		box(500);
  	pop();

	// easter egg in skybox
	push();
		noStroke();
		texture(aspen);
		rotateY(HALF_PI);
		translate(-50, -100, -165)
		plane(400, 400);
	pop(); 

  	if(frameCount % 60 === 0){
      	maze.checkLavaCollision(player);
		//let arrPos = player.playerArrayPosition(player.position.x, player.position.z, 5);
		//console.log(arrPos);
  	}

	
	  	if(dist(player.position.x, player.position.y, player.position.z, book.position.x, book.position.y, book.position.z) < 2 && book.collected == false){
			player.collect(book);
			book.remove();
		} else {
			push();
			texture(bookTexture);
			noStroke();
			book.display();
			pop();
		}

		if(dist(player.position.x, player.position.y, player.position.z, dr.position.x, dr.position.y, dr.position.z) < 3 && player.collectedItems.length > 0){
			pressF();
			if(keyIsDown(70)){
				let result = player.remove(book);
				if(result){
					deposit(book);
				}
			}
		} else {
			try{
				hidepressF();
			} catch(error){}
		}

			push();
			normalMaterial();
			dr.display();
			pop();


	maze.update(balls);
	maze.display();
	player.update();
	for (let i = 0; i < currentBalls; i++) {
		balls[i].display();
		balls[i].update(player, maze);
	}

  	if (help || frameCount < 400) { // Heads Up Display extension
		push(); // this affects the frame rate
		camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
		ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
		fill(0, 0, 0, 200);
		noStroke();
		translate(-380, -380, 0);
		scale(2);
		rect(0, 0, 170, 110);
		fill(127);
		text('mouse: left/right : pan', 10, 25);
		text('       up/down : tilt', 10, 35);
		text(' keys: escape : ptr unlock', 10, 45);
		text('       a/d : left/right', 10, 55);
		text('       w/s : fwd/bkwd', 10, 65);
		if(dlzMode){
			text('       e/q : up/down', 10, 75);
			text('       space : jump', 10, 85);
			text('       +/- : fov change', 10, 95);
			text('       h : help', 10, 105);
		} else {
			text('       space : jump', 10, 75);
			text('       +/- : fov change', 10, 85);
			text('       h : help', 10, 95);
		}
		pop();
	}

	if (startShowingHealth) {
		//console.log('showing health')
		showHealth();
		startShowingHealth = false;
	}

	if(frameCount % 1200 == 0){ // every 20 seconds a fireball will spawn in
		currentBalls++;
		maze.raiseLava(.5);
	}
	
	//Calls createInventory function once
	if (startcreateInventory) {
		createInventory();
		startcreateInventory = false;
	}
}

function mouseClicked() {
	if (player.gameStarted && requestPointerLock()) player.pointerLock = true;
	else if (!player.pointerLock && player.gameStarted) {
		requestPointerLock();
		player.pointerLock = true;
	}

	if (!player.gameStarted && !themePlaying) {
		theme.loop();
		themePlaying = true;
	}
}

