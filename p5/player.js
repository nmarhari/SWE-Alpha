
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
		this.jumps = 1;
		console.log("player health: ", this.health);
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
			if (keyIsDown(87) || keyIsDown(UP_ARROW)){
				this.moveX(this.speed);    // w
				if(!walking.isPlaying()){
					walking.play();
				}
			} 
			else if (keyIsDown(83) || keyIsDown(DOWN_ARROW)){
				this.moveX(-this.speed); // s
				if(!walking.isPlaying()){
					walking.play();
				}
			}
			else if (keyIsDown(69)) this.moveZ(0.05); // e
			else {
				walking.pause();
			}
		}
		if (keyPressed(ESCAPE)) this.pointerLock = false;
		// unlock pointer if ESC is pressed
    }
    
    update() {
		if(this.grounded && frameCount % 60 == 0){
			this.jumps = 1;
		}

      	if (keyIsPressed && key == 'e') {
        	this.grounded = false;
        	return;
      	}
      	this.velocity.add(this.gravity);
      	this.position.add(this.velocity);
  
     	if (this.grounded && keyPressed && keyCode == 32 && this.jumps > 0) { // space
			this.jumps = max(0, this.jumps - 1); // just making sure jumps cant go below 0
        	this.grounded = false;
        	this.velocity.y = -.8;
        	this.position.y -= 0.5;
    	}
    }

	takeHit(){
		if(this.health == 0){
			this.dead = true;
			deathScreen();
		}

		if(this.health > 0){
			this.health -= 10;
			console.log("player health: ", this.health);
		}
	}
}