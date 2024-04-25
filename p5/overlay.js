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
}

function closeStartScreen() {
    frameRate(60);
    //removes all p5 elements associated with start screen
    console.log("clearing start screen...")
    player.gameStarted = true;
    startDiv.remove();
    startText.remove();
    startTitle.remove();
    startDesc.remove();
    startClickables.remove();
    //startCheck.remove();
    startButton.remove();
    theme.pause();
    
    //indicate that the game has started
    startShowingHealth = true;
    startcreateInventory = true;
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
    startcreateInventory = false;
    hideHealth();
    resetInventory();
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
    resetMap();
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
    startcreateInventory = true;
}

function resetMap() {
    maze = new Maze(20, 12);
    maze.setPlayerAtStart(player);
	//Inventory - replace texture links with chair and dr image files when completed
    if (book) 
        book = new Book("Delozier's SE Book", 35, -5, 30, 10, bookModel, 'https://nmarhari.github.io/SWE-Alpha/assets/textures/leather.jpg');
    if (chair)
        chair = new Collectible("Chair", 10, -3.65, 45, .5, chairModel, 'https://nmarhari.github.io/SWE-Alpha/assets/textures/leather.jpg'); // change to chair texture later
	if (dr) 
    dr = new Collectible("Delozier", 90, -6, 4.5, 1.4, drModel, 'https://nmarhari.github.io/SWE-Alpha/assets/textures/leather.jpg'); // change to chair texture later
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

function createInventory() {
    inventoryContainer = createDiv();
    inventoryContainer.id('inventoryContainer');
    inventoryContainer.parent('container');
    for (let i=0; i < 5; i++) {
        const itemSlot = createDiv();
        itemSlot.class('inventorySlot emptySlot');
        itemSlot.parent('inventoryContainer');
    }
}

function updateInventory() {
    let i = 0;
    let container = document.getElementById("inventoryContainer")
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    for (item in player.collectedItems) {
        let elem = document.createElement("img");
        let texture = "https://nmarhari.github.io/SWE-Alpha/assets/textures/leather.jpg";
        console.log(texture);
        elem.setAttribute("src", texture);
        console.log(item.texture)
        const itemSlot = createDiv();
        itemSlot.class('inventorySlot');
        itemSlot.parent('inventoryContainer');
        container.lastChild.appendChild(elem);
        i++;
        console.log(player.collectedItems);
    }
    while (i < 5) {
        const itemSlot = createDiv();
        itemSlot.class('inventorySlot emptySlot');
        itemSlot.parent('inventoryContainer');
        i++;
    }
}

function resetInventory() {
    player.collectedItems = [];
    updateInventory();
}

function hideInventory() {
    inventoryContainer.remove();
}