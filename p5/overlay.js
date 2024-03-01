//this file contains functions associated with any 2D interface

let pauseButton;
let startDiv;
let startCheck; 

function overlay() {
    //function which draws the start screen 
    //secondary canvas is created using the createGraphics() function
    //this function call is located in setup() in sketch.js
    startDiv = createDiv();
    startDiv.size(windowWidth, windowHeight); 
    startDiv.position(0,0);
    startDiv.style('background-color', 'black');
    startDiv.style('opacity', '0');
    pauseButton = createButton('pause');
    pauseButton.position(10, 10);
    pauseButton.style('padding', '15px 32px')
    pauseButton.mouseClicked(closeStartScreen);
}

function closeStartScreen() {
    //removes all p5 elements associated with start screen
    
}
