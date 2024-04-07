//this file contains functions associated with any 2D interface

let container;
function initContainerHTML() {
    container = createDiv();
    container.id('container');
}

let startButton;
let startDiv;
let startCheck; 
let startTitle;
let startText;
let startClickables;
let startDesc;
function startScreen() {
    //pointer can't be locked until this disappears
    player.gameStarted = false;
    //function which draws the start screen 
    //secondary canvas is created using the createGraphics() function
    //    this function call is located in setup() in sketch.js
    startDiv = createDiv();
    startDiv.parent('container');
    startDiv.id('startDiv');

    startText = createDiv();
    startText.parent('startDiv');
    startText.id('startText');

    startTitle = createP('The Floor is Lava');
    startTitle.parent('startText');
    startTitle.id('startTitle');

    startDesc = createP('Navigate a changing environment as the floor turns to lava!')
    startDesc.parent('startText');
    startDesc.id('startDesc');

    startClickables = createDiv();
    startClickables.parent('startDiv');
    startClickables.id('startClickables');

    /*
    startCheck = createCheckbox('make lava harmless');
    startCheck.parent('startClickables');
    startCheck.id('startCheck');
    */

    startButton = createButton('Start');
    startButton.mouseClicked(closeStartScreen);
    startButton.parent('startClickables');
    startButton.id('startButton');
    
    frameRate(0);
}

function closeStartScreen() {
    frameRate(60);
    //removes all p5 elements associated with start screen
    console.log("clearing start screen...")
    player.gameStarted = true;
    startText.remove();
    //startCheck.remove();
    startButton.remove();
    startDiv.remove();
    
    //indicate that the game has started
    startShowingHealth = true;
}


let deathButton;
let deathDiv;
let deathCheck;
let deathTitle;

function deathScreen() {
    player.gameStarted = false;
    player.pointerLock = false;
    exitPointerLock();
    frameRate(0);
    deathDiv = createDiv();
    deathDiv.size(windowWidth, windowHeight); 
    deathDiv.position(0,0);
    deathDiv.style('background-color', 'black');
    deathDiv.style('opacity', '0.5');
    deathTitle = createP('You Died!');
    deathTitle.position(windowWidth/2/2, 40);
    deathTitle.style('color', 'white');
    deathTitle.style('font-size', '42px')
    deathCheck = createCheckbox('make lava harmless');
    deathCheck.position(windowWidth/2/2, 200);
    deathCheck.style('color', 'white')
    deathButton = createButton('start');
    deathButton.position(windowWidth/2/2, 250);
    deathButton.mouseClicked(respawnPlayer);
}

function respawnPlayer() {
    player.dead = false;
    player.health = 100;
    maze.setPlayerAtStart(player);
    deathVisible = false;
    player.gameStarted = true;
    player.pointerLock = true;
    requestPointerLock();
    
    frameRate(60);

    console.log("clearing death screen...")
    deathTitle.remove();
    deathCheck.remove();
    deathButton.remove();
    deathDiv.remove();
    death.remove();

}


// on screen health bar
let healthBarDiv;
let healthInBar;

function showHealth() {

    healthBarDiv = createDiv();
	healthBarDiv.id('healthBarBorder');
    healthBarDiv.class('range');
    healthBarDiv.parent('container');

	healthInBar = createDiv('Health');
	healthInBar.parent('healthBarBorder');
    healthInBar.class('range__label');
    healthInBar.id('healthInBar');

	
    // initialize health as 1
    healthBarDiv.style('--p:', '1');

}
function updateHealth(hp) {
    // normal javascript because p5 does not have the right function!
    hb = document.getElementById("healthBarBorder");
    hb.style.setProperty('--p', hp);
}
function hideHealth() {
    healthBarDiv.remove();
    healthInBar.remove();
}