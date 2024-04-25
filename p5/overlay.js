//this file contains functions associated with any 2D interface

let container;
function initContainerHTML() {
    container = createDiv();
    container.id('container');
}


let startDiv;
let startText;
let startTitle;
let startDesc;
let startClickables;
let startButton;
let dlzButton;
var dlzMode = false;
//let startCheck; 
function startScreen() {
    //pointer can't be locked until this disappears
    player.gameStarted = false;
    frameRate(0);
    //function which draws the start screen 
    //secondary canvas is created using the createGraphics() function
    //    this function call is located in setup() in sketch.js
    startDiv = createDiv();
    startDiv.parent('container');
    startDiv.id('startDiv');

    startImg = createImg('./assets/Kent Touch This.png', 'Logo');
    startImg.parent('startDiv');
    startImg.id('startText');

    startDesc = createP('Navigate a changing environment as the floor turns to lava!')
    startDesc.parent('startText');
    startDesc.id('startTitle');

    startClickables = createDiv();
    startClickables.parent('startDiv');
    startClickables.id('startClickables');

    startButton = createButton('Start');
    startButton.mouseClicked(closeStartScreen);
    startButton.parent('startClickables');
    startButton.id('startButton');
    
    dlzButton = createButton('DLZ Mode');
    dlzButton.mouseClicked(delozierMode);
    dlzButton.parent('startClickables');
    dlzButton.id('dlzButton');


}

function closeStartScreen() {
    frameRate(60);
    //removes all p5 elements associated with start screen
    console.log("clearing start screen...")
    player.gameStarted = true;
    startDiv.remove();
    startImg.remove();
    startDesc.remove();
    startClickables.remove();
    //startCheck.remove();
    startButton.remove();
    theme.pause();
    //indicate that the game has started
    startShowingHealth = true;
    startShowInventory = true;
}

function delozierMode() {
    var dlzButton = document.getElementById('dlzButton'); // Get the button element
    dlzButton.classList.toggle('clicked'); // Toggle the 'clicked' class on the button
    dlzMode = true;
}

let pauseDiv, pauseBlur, pauseText, pauseClickables, pauseButton;
var pauseActive = false;
function pauseScreen(){
    pauseActive = true;
    frameRate(0);
    player.gameStarted = false;
    player.pointerLock = false;
    startShowingHealth = false;
    startShowInventory = false;
    hideHealth();
    hideInventory();

    pauseDiv = createDiv();
    pauseDiv.parent('container');
    pauseDiv.id('deathDiv');
    
    pauseBlur = createDiv();
    pauseBlur.parent('deathDiv');
    pauseBlur.id('deathBlur');

    pauseText = createDiv('Game Paused!');
    pauseText.parent('deathDiv');
    pauseText.id('deathText');
    
    pauseClickables = createDiv();
    pauseClickables.parent('deathDiv');
    pauseClickables.id('deathClickables');

    pauseButton = createButton('Resume');
    pauseButton.parent('deathClickables');
    pauseButton.id('deathButton');
    pauseButton.mouseClicked(closePause);
}

function closePause(){
    frameRate(60);
    pauseActive = false;
    pauseDiv.remove();
    pauseBlur.remove();
    pauseText.remove();
    pauseClickables.remove();
    pauseButton.remove();
    player.gameStarted = true;
    startShowingHealth = true;
    startShowInventory = true;
    player.pointerLock = true;
}


let deathDiv;
let deathBlur;
let deathText;
let deathClickables;
let deathButton;
function deathScreen() {
    player.gameStarted = false;
    player.pointerLock = false;
    exitPointerLock();
    frameRate(0);
    startShowingHealth = false;
    startShowInventory = false;
    hideHealth();
    hideInventory();

    deathDiv = createDiv();
    deathDiv.parent('container');
    deathDiv.id('deathDiv');
    
    deathBlur = createDiv();
    deathBlur.parent('deathDiv');
    deathBlur.id('deathBlur');

    deathText = createDiv('You Died!');
    deathText.parent('deathDiv');
    deathText.id('deathText');
    
    deathClickables = createDiv();
    deathClickables.parent('deathDiv');
    deathClickables.id('deathClickables');

    deathButton = createButton('Restart');
    deathButton.parent('deathClickables');
    deathButton.id('deathButton');
    deathButton.mouseClicked(respawnPlayer);
}

function respawnPlayer() {
    player.dead = false;
    player.health = 100;
    maze = new Maze(20, 12);
    maze.setPlayerAtStart(player);
    deathVisible = false;
    player.gameStarted = true;
    player.pointerLock = true;
    requestPointerLock();
    
    frameRate(60);

    console.log("clearing death screen...")
    deathDiv.remove();
    deathBlur.remove();
    deathText.remove();
    deathClickables.remove();
    deathButton.remove();
    startShowingHealth = true;
    startShowInventory = true;
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
    if (healthInBar) {
        hb = document.getElementById("healthBarBorder");
        hb.style.setProperty('--p', hp);
    }    
}
function hideHealth() {
    healthBarDiv.remove();
    healthInBar.remove();
}

//On screen inventory slots

let inventoryContainer;
let inventoryItems;

function showInventory(){
    inventoryContainer = createDiv();
    inventoryContainer.id('inventoryContainer');
    inventoryItems = createDiv();
    inventoryContainer.style('opacity', '0.3');
    inventoryItems.id('inventorySlot');
    inventoryItems.parent('inventoryContainer');
    inventoryContainer.parent('container');
    for (let i=0; i < 5; i++) {
        const itemSlot = createDiv();
        itemSlot.class('inventorySlot emptySlot');
        itemSlot.parent('inventoryContainer');
    }
}
function hideInventory() {
    inventoryContainer.remove();
    inventoryItems.remove();
}

let depositDiv, depositImg;
function deposit(collectible){
    switch(collectible.name){
        case "Book":
            depositDiv = createDiv();
            depositDiv.parent('container');
            depositDiv.id('depositDiv');

            depositImg = createImg() // image of delozier can be a random ai photo
            depositImg.parent('depositDiv');
            depositImg.id('depositImg');

            
        case "Chair":
    }
} 