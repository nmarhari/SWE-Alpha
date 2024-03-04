
//globals
let start; //canvas for start screen
let startVisible = true; // renders start screen once

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

var player, maze, f, help = false,
  canvas;

function preload() {
  f = loadFont('inconsolata.otf');
  lava = loadImage('https://nmarhari.github.io/SWE-Alpha/assets/lava.jpg');
  msb = '../assets/MSBInterior(1).obj'
  // this must be the static link of the asset (not '../assets/lava.jpg') -nassim
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  start = createGraphics(windowWidth, windowHeight, WEBGL);

  strokeWeight(0.04);
  textFont(f);
  textSize(12);
  //ball = new FireBall(10, -20, 10, 2);
  player = new Player();
  env = new MSB(-12,12,-12,msb);
  env.setPlayerAtStart(player);
  camera(0, -200, 400, 0, 0, 0, 0, 1, 0);
  //maze = new Maze(22,12);
  //maze.setPlayerAtStart(player);
  frameRate(60);
  strokeWeight(2);
}

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

let cameraPosition;

function draw() {
  frameRate(60);
  background(0, 0, 0);

  //maze.update();
  //maze.display();
  lights();
  env.display();
  player.update();
  env.update(player.getPosition());
  //ball.display();
  //ball.update();
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
  } else {
    exitPointerLock();
    player.pointerLock = false;
  }
}