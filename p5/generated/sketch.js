//globals
// fireball and fireball particle arrays
const balls = [], ballParticles = []; 
let numParticles = 10, numberOfBalls = 50, currentBalls = 0; // numbers for particles and fireballs on screen

// basic game variables
var player, gmap, f, help = false, canvas, themePlaying = false, chair;

// for models on screen and skybox
let book, bookModel, skybox, theme, constellation; 
let OBJarray = []; //have to splice objs from array to remove on screen

// overlay
let startVisible = false; // renders start screen once
let deathVisible = false;
let startShowingHealth = true;
let startcreateInventory = true;

//random thing for collectibles
let collectibleTexture, collectibleModel, collectibleName, artifact;
let randomNumber = Math.floor(Math.random() * 3);

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
	skybox = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/sky.jpg');
	constellation = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/drConstellation.png');

	if(randomNumber == 0){
		collectibleTexture = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/textures/fabric.png');
		collectibleModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/Chair.obj');
		collectibleName = "Chair";
	} else if (randomNumber == 1){
		collectibleTexture = loadImage('../assets/textures/macScreen.jpg');
		collectibleModel = loadModel('../assets/laptop.obj');
		collectibleName = "Laptop";
	} else {
		collectibleTexture = loadImage('../assets/textures/dongle.jpg');
		collectibleModel = loadModel('../assets/dongle.obj');
		collectibleName = "Dongle";
	}


	drModel = loadModel('https://nmarhari.github.io/SWE-Alpha/assets/Prof.obj');
	// this must be the static link of the asset (not '../assets/lava.jpg') -nassim

	// have to preload so it can play when starting the game
	ambience = loadSound('../assets/sounds/ambience.mp3');
	lavaSound = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/lava.mp3');
}

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
	soundFormats('mp3', 'wav');
	walking = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/walking-trimmed.mp3');
	hit = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/hit.mp3'); 
	scream = loadSound('https://nmarhari.github.io/SWE-Alpha/assets/sounds/scream.wav'); 
	

	ambience.setVolume(.5);
	lavaSound.setVolume(1.2);

  	strokeWeight(0.02);
 	textFont(f);
 	textSize(12);

	for (let i = 0; i < numberOfBalls; i++) {
		balls.push(new FireBall(10, random(-30, 100), 10, 2));
	}

  	player = new Player();
	player.gameStarted = true;
  	gmap = new GeneratedMap();
 	gmap.setPlayerAtStart(player);

	//book = new Book("Book", randomBlock.x, randomBlock.y - 5, randomBlock.z, 10, bookModel);

	artifact = new Collectible(collectibleName, randomBlock.x, randomBlock.y - 5, randomBlock.z, .5, collectibleModel);
	dr = new Collectible("Delozier", tallestBlock.x, tallestBlock.y - 4, tallestBlock.z, 1, drModel);
 	frameRate(60);
  	strokeWeight(2);
	
	initContainerHTML();
	// initialize container in html for overlay elements
}

// viewport resize when window size changes
window.addEventListener('resize', async function(event){
  await sleep(10); // wait 10 ms for screen to report right value

  resizeCanvas(windowWidth, windowHeight); // resizes p5js canvas
});

function draw() {
	frameRate(60);
  	background(0,0,51);

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
		texture(constellation);
		rotateX(-HALF_PI);
		translate(10, -100, -200)
		plane(400, 400);
	pop();

  	if(frameCount % 60 === 0){
      	gmap.checkLavaCollision(player);
		  //let arrPos = player.playerArrayPosition(player.position.x, player.position.z, 5);
		  //console.log(arrPos);
  	}

	
	  	if(dist(player.position.x, player.position.y, player.position.z, artifact.position.x, artifact.position.y, artifact.position.z) < 2 && artifact.collected == false){
			player.collect(artifact);
			artifact.remove();
		} else {
			push();
			texture(collectibleTexture);
			noStroke();
			artifact.display();
			pop();
		}

		if(dist(player.position.x, player.position.y, player.position.z, dr.position.x, dr.position.y, dr.position.z) < 3){
			pressF();
			if(keyIsDown(70)){
				let result = player.remove(artifact);
				if(result){
					deposit(artifact);
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


	gmap.update(balls);
	gmap.display();
	player.update();
	for (let i = 0; i < currentBalls; i++) {
		balls[i].display();
		balls[i].update(player, gmap);
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
		text('       e/q : up/down', 10, 75);
		text('       space : jump', 10, 85);
		text('       +/- : fov change', 10, 95);
		text('       h : help', 10, 105);
		pop();
	}

	if (startShowingHealth) {
		showHealth();
		lavaSound.loop();
		ambience.loop();
		startShowingHealth = false;
	}

	if(frameCount % 600 == 0){ // every 20 seconds a fireball will spawn in and lava will rise
		currentBalls++;
		gmap.raiseLava(1);
	}
	
	//Calls showInventory function once
	if (startcreateInventory) {
		createInventory();
		startcreateInventory = false;
	}
}

function mouseClicked() {
	if (player.gameStarted && requestPointerLock()) player.pointerLock = true;
	else
	if (!player.pointerLock && player.gameStarted) {
		requestPointerLock();
		player.pointerLock = true;
	}
}

