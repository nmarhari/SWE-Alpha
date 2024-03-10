
class Player extends RoverCam {
    constructor() {
      	super();
      	this.dimensions = createVector(1, 3, 1);
      	this.velocity = createVector(0, 0, 0);
      	this.gravity = createVector(0, 0.03, 0);
      	this.grounded = false;
      	this.pointerLock = false;
      	this.sensitivity = 0.002;
      	this.speed = 0.04;
		this.health = 100;
      	this.dead = false;
		this.collectable = false;
		console.log("player health: ", this.health);
    }
    
    controller() { // override
		if(!this.dead){
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
					this.moveX(this.speed * 1.1);    // shift w
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
			
			if (keyIsDown(69)) this.moveZ(0.05); // e
			else {
				walking.pause();
			}

			if(keyIsDown(76)) //printing player position to the console // key is L
				console.log(this.position.x, this.position.y, this.position.z);
		}
		if (keyPressed(ESCAPE)) this.pointerLock = false;
		// unlock pointer if ESC is pressed
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
		
		if(this.collectable)
			console.log('found');
    }

	takeHit(){
		if(this.health == 0){
			scream.play();
			this.dead = true;
			deathScreen();
		}

		if(this.health > 0){
			if(!hit.isPlaying()){
				hit.play();
			}
			this.health -= 10;
			console.log("player health: ", this.health);
		}
	}
}