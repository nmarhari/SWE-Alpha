//this file contains functions associated with any 2D interface

let startButton;
let startDiv;
let startCheck; 
let startTitle;

function startScreen() {
    //function which draws the start screen 
    //secondary canvas is created using the createGraphics() function
    //    this function call is located in setup() in sketch.js
    startDiv = createDiv();
    startDiv.size(windowWidth, windowHeight); 
    startDiv.position(0,0);
    startDiv.style('background-color', 'black');
    startDiv.style('opacity', '0.5');
    startTitle = createP('The Floor is Lava');
    startTitle.position(windowWidth/2/2, 40);
    startTitle.style('color', 'white');
    startTitle.style('font-size', '42px')
    startCheck = createCheckbox('make lava harmless');
    startCheck.position(windowWidth/2/2, 200);
    startCheck.style('color', 'white')
    startButton = createButton('start');
    startButton.position(windowWidth/2/2, 250);
    startButton.mouseClicked(closeStartScreen);
}

function closeStartScreen() {
    //removes all p5 elements associated with start screen
    console.log("clearing start screen...")
    startTitle.remove();
    startCheck.remove();
    startButton.remove();
    startDiv.remove();
    start.remove();
}


let deathButton;
let deathDiv;
let deathCheck;
let deathTitle;

function deathScreen() {
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
    
    frameRate(60);

    console.log("clearing death screen...")
    deathTitle.remove();
    deathCheck.remove();
    deathButton.remove();
    deathDiv.remove();
    death.remove();

}