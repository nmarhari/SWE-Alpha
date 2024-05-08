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
    //console.log("clearing start screen...")
    player.gameStarted = true;
    startDiv.remove();
    startImg.remove();
    startDesc.remove();
    startClickables.remove();
    //startCheck.remove();
    startButton.remove();
    theme.stop();
    //indicate that the game has started
    startShowingHealth = true;
    startcreateInventory = true;
}

function delozierMode() {
    var dlzButton = document.getElementById('dlzButton'); // Get the button element
    dlzButton.classList.toggle('clicked'); // Toggle the 'clicked' class on the button
    dlzMode = true;
}

/*let pauseDiv, pauseBlur, pauseText, pauseClickables, pauseButton;
var pauseActive = false;
function pauseScreen(){
    pauseActive = true;
    frameRate(0);
    player.gameStarted = false;
    player.pointerLock = false;
    startShowingHealth = false;
    startcreateInventory = false;
    hideHealth();
    resetInventory();
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
    startShowingHealth = true;
    startShowingInventory = true;
    frameRate(60);
    pauseActive = false;
    pauseDiv.remove();
    pauseBlur.remove();
    pauseText.remove();
    pauseClickables.remove();
    pauseButton.remove();
    player.gameStarted = true;
    if(depositActive){

       hideHealth();
       hideInventory(); 
    }
    player.pointerLock = true;
}*/

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

    //console.log("clearing death screen...")
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
        book = new Book("Book", 35, -5, 30, 10, bookModel);
    if (chair)
        chair = new Collectible("Chair", 10, -3.65, 45, .5, chairModel); // change to chair texture later
	if (dr) 
    dr = new Collectible("Delozier", 90, -6, 4.5, 1.4, drModel); // change to chair texture later
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
    // for (let i=0; i < ; i++) {
    //     const itemSlot = createDiv();
    //     itemSlot.class('inventorySlot emptySlot');
    //     itemSlot.parent('inventoryContainer');
    // }
}

function updateInventory(itemsCopy) {
    let container = document.getElementById("inventoryContainer")
    while (container.firstChild) {
        container.removeChild(container.lastChild);
    }
    for (let item of itemsCopy) {
        //console.log(item)
        let elem = document.createElement("img");
        let imgPath = "";
        //console.log(item.name)
        if(item.name == "Chair"){
            imgPath = "./assets/chair.jpg"
        }else if(item.name == "Book"){
            imgPath = "./assets/book.jpg"
        }
        //console.log(imgPath);
        elem.setAttribute("src", imgPath);
        //console.log(item.texture)
        itemSlot = createDiv();
        itemSlot.class('inventorySlot');
        itemSlot.child(elem);
        itemSlot.parent('inventoryContainer');
        container.lastChild.appendChild(elem);
        //i++;
        //console.log(player.collectedItems);
    }
    // while (i < numberOfCollectibles) {
    //     const itemSlot = createDiv();
    //     itemSlot.class('inventorySlot emptySlot');
    //     itemSlot.parent('inventoryContainer');
    //     i++;
    // }
}

function resetInventory() {
    player.collectedItems = [];
    updateInventory(player.collectedItems);
}

function hideInventory() {
    inventoryContainer.remove();
}

let depositDiv, depositTextDiv, depositImg, depositText, depositHeader, depositActive = true;
let showPressF = true, pressFpara, pressFtext;
function deposit(collectible){
    if(depositActive){
        showPressF = false;
        switch(collectible.name){
            case 'Book':
                depositActive = false;
                hideHealth();
                hideInventory();

                depositDiv = createDiv();
                depositDiv.parent('container');
                depositDiv.id('depositDiv');

                depositImg = createImg('./assets/kingdelozier.png', 'King Delozier'); // image of delozier can be a random ai photo
                depositImg.parent('depositDiv');
                depositImg.id('depositImg');

                depositTextDiv = createDiv();
                depositTextDiv.parent('depositDiv');
                depositTextDiv.id('depositTextDiv');

                depositHeader = createP('Dr. Delozier');
                depositHeader.parent('depositTextDiv');
                depositHeader.id('depositHeader');

                depositText = createP("Took you long enough to find my software engineering book. If I'm going to get us out of here I'll need my chair.");
                depositText.parent('depositTextDiv');
                depositText.id('depositText');

                depositText = createP("Go find it and I can work on a solution to get us out of this mess.");
                depositText.parent('depositTextDiv');
                depositText.id('depositText');
                break;
                
            case 'Chair':
                depositActive = false;
                hideHealth();
                hideInventory();

                depositDiv = createDiv();
                depositDiv.parent('container');
                depositDiv.id('depositDiv');

                depositImg = createImg('./assets/kingdelozier.png', 'King Delozier'); // image of delozier can be a random ai photo
                depositImg.parent('depositDiv');
                depositImg.id('depositImg');

                depositTextDiv = createDiv();
                depositTextDiv.parent('depositDiv');
                depositTextDiv.id('depositTextDiv');

                depositHeader = createP('Dr. Delozier');
                depositHeader.parent('depositTextDiv');
                depositHeader.id('depositHeader');

                depositText = createP("Finally I can actually sit down and do some work.");
                depositText.parent('depositTextDiv');
                depositText.id('depositText');

                depositText = createP("Wait...  Where's my dongle at?");
                depositText.parent('depositTextDiv');
                depositText.id('depositText');
                break;

            case 'Dongle':
                depositActive = false;
                hideHealth();
                hideInventory();

                depositDiv = createDiv();
                depositDiv.parent('container');
                depositDiv.id('depositDiv');

                depositImg = createImg('./assets/kingdelozier.png', 'King Delozier'); // image of delozier can be a random ai photo
                depositImg.parent('depositDiv');
                depositImg.id('depositImg');

                depositTextDiv = createDiv();
                depositTextDiv.parent('depositDiv');
                depositTextDiv.id('depositTextDiv');

                depositHeader = createP('Dr. Delozier');
                depositHeader.parent('depositTextDiv');
                depositHeader.id('depositHeader');

                depositText = createP("Yanno everyone should have one of these.");
                depositText.parent('depositTextDiv');
                depositText.id('depositText');

                depositText = createP("They're really useful. You can pick one up at Walmart for $40.");
                depositText.parent('depositTextDiv');
                depositText.id('depositText');
                break;

                case 'Laptop':
                    depositActive = false;
                    hideHealth();
                    hideInventory();

                    depositDiv = createDiv();
                    depositDiv.parent('container');
                    depositDiv.id('depositDiv');
    
                    depositImg = createImg('./assets/kingdelozier.png', 'King Delozier'); // image of delozier can be a random ai photo
                    depositImg.parent('depositDiv');
                    depositImg.id('depositImg');

                    depositTextDiv = createDiv();
                    depositTextDiv.parent('depositDiv');
                    depositTextDiv.id('depositTextDiv');
    
                    depositHeader = createP('Dr. Delozier');
                    depositHeader.parent('depositTextDiv');
                    depositHeader.id('depositHeader');
    
                    depositText = createP("This better have github actions running on it.");
                    depositText.parent('depositTextDiv');
                    depositText.id('depositText');
    
                    depositText = createP("If it doesn't have automated testing I don't want it.");
                    depositText.parent('depositTextDiv');
                    depositText.id('depositText');
                    break;
            default:
                    /* hideHealth();
                    hideInventory();
                    depositDiv = createDiv();
                    depositDiv.parent('container');
                    depositDiv.id('depositDiv');
    
                    depositImg = createImg('./assets/kingdelozier.png', 'King Delozier'); // image of delozier can be a random ai photo
                    depositImg.parent('depositDiv');
                    depositImg.id('depositImg');
    
                    depositHeader = createP('Dr. Delozier');
                    depositHeader.parent('depositDiv');
                    depositHeader.id('depositHeader');
    
                    depositText = createP("You don't have any of my items.");
                    depositText.parent('depositDiv');
                    depositText.id('depositText');
    
                    depositText = createP("Why are you trying to give me something if you don't have it.");
                    depositText.parent('depositDiv');
                    depositText.id('depositText'); */
                break;
        }
    }
} 

function pressF(){
    if(showPressF){
        showPressF = false;

        pressFpara = document.createElement("p");
		pressFtext = document.createTextNode("Press F to give");
		pressFpara.appendChild(pressFtext);
		pressFpara.classList.add("collectible-notification");
		document.body.appendChild(pressFpara);
    }
}

function hidepressF(){
    showPressF = true;
    pressFpara.remove();
    pressFtext.remove()
}