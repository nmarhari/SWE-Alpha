class Player extends RoverCam {
    constructor() {
      	super();
      	this.dimensions = createVector(.8, .8, .8);
      	this.velocity = createVector(0, 0, 0);
      	this.gravity = createVector(0, 0.04, 0);
      	this.grounded = false;
      	this.pointerLock = false;
      	this.sensitivity = 0.002;
      	this.speed = 0.02;
		this.health = 100;
      	this.dead = false;
		console.log("player health: ", this.health);
		console.log(this.position.x);
		console.log(this.position.y);
		console.log(this.position.z);
    }
    
    controller() { // override
		if(!this.dead){
			if (player.pointerLock) {
				this.yaw(movedX * this.sensitivity);   // mouse left/right
				this.pitch(movedY * this.sensitivity); // mouse up/down
				if(keyIsDown(65) || keyIsDown(LEFT_ARROW))  this.moveY(0.01 * 3); // a
				if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.moveY(-0.01 * 3);// d
			}
			else { // otherwise yaw/pitch with keys
				if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) this.yaw(-0.02); // a
				if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) this.yaw(0.02); // d
				if (keyIsDown(82)) this.pitch(-0.02); // r
				if (keyIsDown(70)) this.pitch(0.02);  // f
			}
			if (keyIsDown(87) || keyIsDown(UP_ARROW)) this.moveX(this.speed);    // w
			if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) this.moveX(-this.speed); // s
			if (keyIsDown(69)) {this.moveZ(0.05); console.log(this.position.x, this.position.z); console.log('array pos' , this.playerArrayPosition(this.position.x, this.position.z, 1));

			} // e
		}
    }
    
    update() {
      	if (keyIsPressed && key == 'e') {
        	this.grounded = false;
        	return;
      	}
      	this.velocity.add(this.gravity);
      	this.position.add(this.velocity);
  
     	if (this.grounded && keyIsPressed && keyCode == 32) { // space
        	this.grounded = false;
        	this.velocity.y = -1.5;
        	this.position.y -= 0.2;
      	}
    }

	takeHit(){
		if(this.health > 0){
			this.health -= 10;
			console.log("player health: ", this.health);
		} else {
			this.dead = true;
			deathScreen();
		}

	}

	playerArrayPosition(playerX, playerZ, blockSize) {
		// Calculate the array indices based on player coordinates and block size
		let arrayX = Math.floor(playerX / blockSize);
		let arrayZ = Math.floor(playerZ / blockSize);
		if(arrayX < 0) arrayZ = 0;
		if(arrayZ < 0) arrayZ = 0;
		return { x: arrayX, z: arrayZ };
	}
}