class FireParticle{
  	constructor(tempX, tempY, tempZ, tempR) {
		this.x = tempX;
		this.y = tempY;
		this.z = tempZ;
		this.radius = tempR;
		this.display = true;

		// pick a random color
		this.color = color(255);
		let r = random(3);
		if(r < 1){
		this.color = color(255,100,20,50); // orange
		} else if(r >= 1 && r < 2 ){
		this.color = color(255, 200, 10, 50); // yellow
		} else if(r >= 2 ){
		this.color = color(255, 80, 5, 50); // reddish
		}  
  	}

  	show() {
		if(this.display){
			push();
			fill(this.color);
			noStroke();
			translate(this.x, this.y, this.z);
			sphere(this.radius);
			pop();
		}

  	}

	remove(){this.display = false;}

  	move() {
		this.x += random(-2, 2);
		this.y -= random(1, 4);
		this.z += random(-1, 1);
  	}
  
  	shrink(){    // shrink size over time
   		this.radius-=0.4;
  	}
}