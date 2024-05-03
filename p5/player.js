class Player extends RoverCam {
    constructor() {
      	super();
      	this.dimensions = createVector(1, 3, 1);
      	this.velocity = createVector(0, 0, 0);
      	this.gravity = createVector(0, 0.037, 0);
      	this.grounded = false;
      	this.pointerLock = false;
		this.gameStarted = false;
      	this.sensitivity = 0.002;
      	this.speed = 0.04;
		this.health = 100;
      	this.dead = false;
		this.jumps = 1;
		this.collectedItems = [];

		console.log("player health: ", this.health);
    }
    
    controller() { // override
		if(!this.dead){
			//console.log('controller');
			if (player.pointerLock) {
				this.yaw(movedX * this.sensitivity);   // mouse left/right
				this.pitch(movedY * this.sensitivity); // mouse up/down
				if(keyIsDown(65) || keyIsDown(LEFT_ARROW))  this.moveY(0.01 * 2); // a
				if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.moveY(-0.01 * 2);// d
			}
			else { // otherwise yaw/pitch with keys
				if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) this.yaw(-0.02); // a
				if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.yaw(0.02); // d
				if (keyIsDown(82)) this.pitch(-0.02); // r
				if (keyIsDown(70)) this.pitch(0.02);  // f
			}

			if (keyIsDown(87) || keyIsDown(UP_ARROW)){
				if(keyIsDown(16)){
					this.moveX(this.speed * 1.35);    // shift w
				} else {
					this.moveX(this.speed / 1.5);
				}


				if(!walking.isPlaying()){
					walking.play();
				}
			} 

			if (keyIsDown(83) || keyIsDown(DOWN_ARROW)){
				this.moveX(-this.speed / 2); // s
				if(!walking.isPlaying()){
					walking.play();
				}
			}

			if(dlzMode){
				if (keyIsDown(69)) { // fly // e
					this.moveZ(0.05);
					walking.pause();
				} 
			
				if(keyIsDown(76)) //printing player position to the console // key is L
					console.log(this.position.x, this.position.y, this.position.z);
				
			} else { // if you dont do anything the player just stops mid air
				if (keyIsDown(69)) { // fly // e
					this.moveZ(-0.05);
					walking.pause();
				} 
			}

			if(keyIsDown(189)){
				if(player.pov.fovy <= 2){
					//console.log(player.pov.fovy)
					player.pov.fovy += 0.01;
					player.updatePOV();
				}
			}
		
			if(keyIsDown(187)){
				if( player.pov.fovy >= .5){
					//console.log(player.pov.fovy)
					player.pov.fovy -= 0.01;
					player.updatePOV();
				}
			}
		
			if(keyIsDown(72)) help = !help;
		}

		if (this.grounded && keyIsDown(32) && this.jumps > 0) { // space
			this.jumps = max(0, this.jumps - 1); // just making sure jumps cant go below 0
        	this.grounded = false;
        	this.velocity.y -= .8;
        	this.position.y -= 2;
    	}


		// unlock pointer if ESC is pressed
		/*if (keyIsDown(27) && !pauseActive){
			pauseScreen();
		}*/

		if (!this.dead /*&& !pauseActive*/ && depositActive) updateHealth(this.health);
    }
    
    update() {
		if(this.health == 0){
			scream.play();
			this.dead = true;
			this.pointerLock = false; //unlock the pointer here
			deathScreen();
			currentBalls = 0; // fixes fireballs so there arent mutiple when respawning
		}
		
		if(this.grounded && frameCount % 60 == 0){
			this.jumps = 1;
		}

      	if (keyIsPressed && key == 'e') {
        	this.grounded = false;
        	return;
      	}
      	this.velocity.add(this.gravity);
      	this.position.add(this.velocity);
    }

	takeHit(){
		if(this.health > 0){
			if(!hit.isPlaying()){
				hit.play();
			}
			this.health -= 10;
			console.log("player health: ", this.health);
		}
	}

	collect(collectible){
		this.collectedItems.push(collectible);
    
		let text2 = document.createTextNode("Return to Dr. Delozier IMMEDIATELY!!");
		switch(collectible.name){
			case "Book":
				let bookP = document.createElement("p");
				let bookText1 = document.createTextNode("Software Engineering Book Artifact Found");
				
				bookP.appendChild(bookText1);
				bookP.appendChild(document.createElement("br")); // Create a line break
				bookP.appendChild(text2);
					bookP.classList.add("collectible-notification");
		
					// Append the paragraph to the document body
					document.body.appendChild(bookP);
		
					// Remove the paragraph after 3 seconds
					setTimeout(function() {
						bookP.remove(); // Remove the paragraph after another 3 seconds
					}, 4000);
				break;

			case "Chair":
				let chairP = document.createElement("p");
				let chairText1 = document.createTextNode("MSB Chair Artifact Found");
				
				chairP.appendChild(chairText1);
				chairP.appendChild(document.createElement("br")); // Create a line break
				chairP.appendChild(text2);
					chairP.classList.add("collectible-notification");
		
					// Append the paragraph to the document body
					document.body.appendChild(chairP);
		
					// Remove the paragraph after 3 seconds
					setTimeout(function() {
						chairP.remove(); // Remove the paragraph after another 3 seconds
					}, 4000);
				break;

			case "Dongle":
				let dongleP = document.createElement("p");
				let dongleText1 = document.createTextNode("Dongle Artifact Found");
				
				dongleP.appendChild(dongleText1);
				dongleP.appendChild(document.createElement("br")); // Create a line break
				dongleP.appendChild(text2);
					dongleP.classList.add("collectible-notification");
		
					// Append the paragraph to the document body
					document.body.appendChild(dongleP);
		
					// Remove the paragraph after 3 seconds
					setTimeout(function() {
						dongleP.remove(); // Remove the paragraph after another 3 seconds
					}, 4000);
				break;

			case "Laptop": 
				let laptopP = document.createElement("p");
				let laptopText1 = document.createTextNode("Laptop Artifact Found");
				
				laptopP.appendChild(laptopText1);
				laptopP.appendChild(document.createElement("br")); // Create a line break
				laptopP.appendChild(text2);
					laptopP.classList.add("collectible-notification");
		
					// Append the paragraph to the document body
					document.body.appendChild(laptopP);
		
					// Remove the paragraph after 3 seconds
					setTimeout(function() {
						laptopP.remove(); // Remove the paragraph after another 3 seconds
					}, 4000);
				break;
		}
		updateInventory();
	}

	remove(collectible) {
		const index = this.collectedItems.indexOf(collectible);
		if (index !== -1) {
		  this.collectedItems.splice(index, 1);
		  return true; // Indicate success
		}
		return false; // Indicate failure (item not found)
	}

	hasCollected(collectible){ // returns true if player has collected said item
		return this.collectedItems.includes(collectible); 
	}

	playerArrayPosition(playerX, playerZ, blockSize) {
		// Calculate the array indices based on player coordinates and block size
		let arrayX = Math.floor(playerX / blockSize);
		let arrayZ = Math.floor(playerZ / blockSize);
		if(arrayX < 0) arrayX = 0;
		if(arrayZ < 0) arrayZ = 0;

		arrayX *= blockSize;
		arrayZ *= blockSize;

		return { x: arrayX, z: arrayZ };
	}
}