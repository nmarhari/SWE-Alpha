// Ported to JS from github.com/jrc03c/queasycam/tree/master/examples/MazeRunner
let lava; 
class Block {
  	constructor(x, y, z, w, h, d, t) {
		this.position = createVector(x, y, z);
		this.dimensions = createVector(w, h, d);
		this.fillColor = color(random(150, 200));
		this.texture = t;
		this.visited = false;
	}

 	update() {
		let playerLeft = player.position.x - player.dimensions.x / 2;
		let playerRight = player.position.x + player.dimensions.x / 2;
		let playerTop = player.position.y - player.dimensions.y / 2;
		let playerBottom = player.position.y + player.dimensions.y / 2;
		let playerFront = player.position.z - player.dimensions.z / 2;
		let playerBack = player.position.z + player.dimensions.z / 2;
		let boxLeft = this.position.x - this.dimensions.x / 2;
		let boxRight = this.position.x + this.dimensions.x / 2;
		let boxTop = this.position.y - this.dimensions.y / 2;
		let boxBottom = this.position.y + this.dimensions.y / 2;
		let boxFront = this.position.z - this.dimensions.z / 2;
		let boxBack = this.position.z + this.dimensions.z / 2;

		let boxLeftOverlap = playerRight - boxLeft;
		let boxRightOverlap = boxRight - playerLeft;
		let boxTopOverlap = playerBottom - boxTop;
		let boxBottomOverlap = boxBottom - playerTop;
		let boxFrontOverlap = playerBack - boxFront;
		let boxBackOverlap = boxBack - playerFront;

		if (((playerLeft > boxLeft && playerLeft < boxRight || (playerRight > boxLeft && playerRight < boxRight)) && ((playerTop > boxTop && playerTop < boxBottom) || (playerBottom > boxTop && playerBottom < boxBottom)) && ((playerFront > boxFront && playerFront < boxBack) || (playerBack > boxFront && playerBack < boxBack)))) {
			let xOverlap = max(min(boxLeftOverlap, boxRightOverlap), 0);
			let yOverlap = max(min(boxTopOverlap, boxBottomOverlap), 0);
			let zOverlap = max(min(boxFrontOverlap, boxBackOverlap), 0);

			if (xOverlap < yOverlap && xOverlap < zOverlap) {
				if (boxLeftOverlap < boxRightOverlap) {
					player.position.x = boxLeft - player.dimensions.x / 2;
					} else {
						player.position.x = boxRight + player.dimensions.x / 2;
					}
				} else if (yOverlap < xOverlap && yOverlap < zOverlap) {
					if (boxTopOverlap < boxBottomOverlap) {
						player.position.y = boxTop - player.dimensions.y / 2;
						player.velocity.y = 0;
						player.grounded = true;
					} else {
						player.position.y = boxBottom + player.dimensions.y / 2;
					}
				} else if (zOverlap < xOverlap && zOverlap < yOverlap) {
					if (boxFrontOverlap < boxBackOverlap) {
						player.position.z = boxFront - player.dimensions.x / 2;
					} else {
						player.position.z = boxBack + player.dimensions.x / 2;
					}
				}
		}
    }

  	display() {
		push();
		translate(this.position.x, this.position.y, this.position.z);
		if (this.texture!=null) {
			texture(this.texture);
			//console.log(this.texture);
		} else{
			fill(this.fillColor);
			//console.log(this.texture);
		}
		box(this.dimensions.x, this.dimensions.y, this.dimensions.z);
		//console.log(lava);
		pop();
  	}

  	moveDown() {
    	this.position.y += 5;
  	}
  // moveUp() {
  //   this.position.y += 5;
  // }
}

class FireBall {
		constructor(x, y, z, r) {
			this.position = createVector(x, y, z);
			this.radius = r;
			// this.fillColor = color(random(150, 200));
			this.texture = lava;
			this.visited = false;
		}

	  	update(player) {
		// if(this.position.y === playerTop + 1){
		// 	player.takeHit();
		// 	console.log("got hit")
		// } 
    		this.position.y += 1; 
			if(this.position.y>10) {
				this.position.y = -100;
				//this.position.x = random(10,100);
				//this.position.z = random(10,50);
				this.position.x = player.position.x + random(10,75);
				this.position.z = player.position.z + random(10,50);
			}
  		}	

		display() {
			push();
			translate(this.position.x, this.position.y, this.position.z);
			texture(this.texture);
			noStroke();
			sphere(this.radius);
			//console.log(lava);
			pop();
		}

		checkCollision(player){
			if( (player.position.y - player.dimensions.y / 2) <= (this.position.y + this.radius) &&  // player top
				(player.position.x - player.dimensions.x / 2) <= (this.position.x + this.radius) && // player left
				(player.position.x + player.dimensions.x / 2) >= (this.position.x - this.radius) && // player right
				(player.position.z - player.dimensions.z / 2) <= (this.position.z + this.radius) && // player front
				(player.position.z + player.dimensions.z / 2) >= (this.position.z = this.radius) // player back
			)
				console.log("fireball hit");
		}

}

/*class Maze {
  constructor(size1, size2) {
    this.blocks = new Array(size1);

    for (let i = 0; i < size1; i++) {
      this.blocks[i] = new Array(size2);
      for (let j = 0; j < size2; j++) {
        let x = i * 5;
        let y = 0;
        let z = j * 5;
        this.blocks[i][j] = new Block(x, y, z, 5, 5, 5, null);
      }
    }

    this.start = this.blocks[1][1];
    //this.blocks[1][1].fillColor = color(63, 127, 63);
    // var m = [
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    //   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    // ];
    for (let i = 0; i < size1; i++)
      for (let j = 0; j < size2; j++)
        if (i==0 || j == 0 || i == size1-1 || j == size2-1) this.blocks[i][j].dimensions.y=20;
        else if(i%2 && j%2) this.blocks[i][j].texture = lava;
        else this.blocks[i][j].fillColor = color(127);
    //this.blocks[3][3].fillColor = color(127, 63, 63);
  }


  update() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        this.blocks[i][j].update();
      }
    }
  }

  display() {
    for (let i = 0; i < this.blocks.length; i++) {
      for (let j = 0; j < this.blocks[i].length; j++) {
        this.blocks[i][j].display();
      }
    }
  }

  setPlayerAtStart(player) {
    player.position = p5.Vector.add(this.start.position, createVector(0, -15, 0));
  }

  checkLavaCollision(player) {
    for (let i = 0; i < this.blocks.length; i++) {
      	for (let j = 0; j < this.blocks[i].length; j++) {
			let block = this.blocks[i][j];
        	if (this.blocks[i][j].texture === lava) {
				let playerLeft = player.position.x - player.dimensions.x / 2;
				let playerRight = player.position.x + player.dimensions.x / 2;
				let playerTop = player.position.y - player.dimensions.y / 2;
				let playerBottom = player.position.y + player.dimensions.y / 2;
				let playerFront = player.position.z - player.dimensions.z / 2;
				let playerBack = player.position.z + player.dimensions.z / 2;

				let blockLeft = block.position.x - block.dimensions.x / 2;
                let blockRight = block.position.x + block.dimensions.x / 2;
                let blockTop = block.position.y - block.dimensions.y / 2;
                let blockBottom = block.position.y + block.dimensions.y / 2;
                let blockFront = block.position.z - block.dimensions.z / 2;
                let blockBack = block.position.z + block.dimensions.z / 2;
          	// Assuming the player has a radius, you need to adjust the collision detection
			  if (
					playerBottom >= blockTop &&
					playerRight >= blockLeft &&
					playerLeft <= blockRight &&
					playerBack >= blockFront &&
					playerFront <= blockBack &&
					playerTop <= blockBottom
				) {
            		// Collision detected with lava tile
            		// Handle collision here, e.g., reduce player health
            			//return true; // Collision detected
						//console.log("true");
						player.takeHit();
          		}
        	}
      	}
    }
    //return false; // No collision detected
	//console.log("false");
  }
}*/

let resolutionNum1 = 0.01;		// how 'crazy' the map generation gets
let terrainRange = 100;		// how much the y level will vary
let widthOfMap = 30 *5;		// *5 for width and depth as that is the size of the blocks
let depth = 30 *5;			// ^ better to have it as a multiple of 10 so that it can be divisible easily
//let mapLava = 6;
class GeneratedMap {
	
	constructor(size) {
		this.blocks = new Array(size);
		for (let x = 0; x < widthOfMap; x+= size){
			this.blocks[x] = new Array(size);
			for (let z = 0; z < depth; z+=size) {
				let y = floor(noise(x * resolutionNum1, z * resolutionNum1) * terrainRange);
					console.log(y);
					push();
					translate(x,0,z);
					if (y > 60) { 
						this.blocks[x][z] = new Block(x, 60, z, 10, 10, 10, lava);
					} else {
						this.blocks[x][z] = new Block(x, y, z, 10, 10, 10, null);
					}
					pop();
			}
		}
		this.start = this.blocks[(widthOfMap/3)][(depth/3)];
	}

	update(size) {
		for (let x = 0; x < this.blocks.length; x+=size) {
		  for (let z = 0; z < this.blocks[x].length; z+=size) {
			this.blocks[x][z].update();
		  }
		}
	}

	display(size) {
		for (let x = 0; x < this.blocks.length; x+=size) {
			for (let z = 0; z < this.blocks[x].length; z+=size) {
				this.blocks[x][z].display();
			}
		}
	}
  
	setPlayerAtStart(player) {
	  player.position = p5.Vector.add(this.start.position, createVector(0, -15, 0));
	}

	checkLavaCollision(player, size) {
		for (let x = 0; x < this.blocks.length; x+=size) {
			  for (let z = 0; z < this.blocks[x].length; z+=size) {
				let block = this.blocks[x][z];
				if (this.blocks[x][z].texture === lava) {
					let playerLeft = player.position.x - player.dimensions.x / 2;
					let playerRight = player.position.x + player.dimensions.x / 2;
					let playerTop = player.position.y - player.dimensions.y / 2;
					let playerBottom = player.position.y + player.dimensions.y / 2;
					let playerFront = player.position.z - player.dimensions.z / 2;
					let playerBack = player.position.z + player.dimensions.z / 2;
	
					let blockLeft = block.position.x - block.dimensions.x / 2;
					let blockRight = block.position.x + block.dimensions.x / 2;
					let blockTop = block.position.y - block.dimensions.y / 2;
					let blockBottom = block.position.y + block.dimensions.y / 2;
					let blockFront = block.position.z - block.dimensions.z / 2;
					let blockBack = block.position.z + block.dimensions.z / 2;
				  // Assuming the player has a radius, you need to adjust the collision detection
				  if (
						playerBottom >= blockTop &&
						playerRight >= blockLeft &&
						playerLeft <= blockRight &&
						playerBack >= blockFront &&
						playerFront <= blockBack &&
						playerTop <= blockBottom
					) {
						// Collision detected with lava tile
						// Handle collision here, e.g., reduce player health
							//return true; // Collision detected
							//console.log("true");
							player.takeHit();
					  }
				}
			  }
		}
		//return false; // No collision detected
		//console.log("false");
	  }
  
}