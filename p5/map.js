// Ported to JS from github.com/jrc03c/queasycam/tree/master/examples/MazeRunner
let lava, meteorite;
class Block {
  	constructor(x, y, z, w, h, d, t) {
		this.position = createVector(x, y, z);
		this.dimensions = createVector(w, h, d);
		this.fillColor = color(random(150, 200));
		this.texture = t;
		this.visited = false;
	}

 	update(reddish) {
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
		if(reddish == 'red') this.fillColor = 'red'; 
		else this.fillColor = color(200)
    }

  	display() {
		push();
		translate(this.position.x, this.position.y, this.position.z);
		if (this.texture!=null) {
			noStroke();
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
			this.texture = meteorite;
			this.visited = false;
			this.blockx = 1000000;
			this.blockz = 1000000;
		}

		update(maze, player) {
			let distance = dist(player.position.x, player.position.y, player.position.z, this.position.x, this.position.y, this.position.z);
			let threshold = 75;
			//console.log("Player position:", player.position.x, player.position.y, player.position.z);
    		//console.log("Fireball position:", this.position.x, this.position.y, this.position.z);
			if (distance < threshold) {
				if(frameCount % 15 == 0)
					this.checkCollision(player);
				/*
				let para = createP("FIREBALL INCOMING!!");
				para.class("fireball-notification");
	
				setTimeout(function() {
					para.style("display", "none");
				}, 2000);
				*/
			}
			this.position.y += 1; 

			if(this.position.y>10) {
				this.position.y = -100;

				//this.position.x = random(10,100);
				//this.position.z = random(10,50);
				// this.position.x = player.position.x + random(10,75);
				// this.position.z = player.position.z + random(10,50);
				this.blockx = Math.floor(random(1, maze.size1-1)); 
				this.blockz = Math.floor(random(1, maze.size2-1));
				if(this.blockx == maze.size1-1){
					this.blockx = this.blockx-1; 
				}
				if(this.blockz == maze.size2-1){
					this.blockz = this.blockz-1; 
				}
				this.position.x = this.blockx*5
				this.position.z = this.blockz*5  
			}


			for(let i = ballParticles.length - 1; i>= 0; i--){
				ballParticles[i].move();
				ballParticles[i].show();
				ballParticles[i].shrink();
			
				if(ballParticles[i].radius <= 0 ){//remove the dead ones
					ballParticles.splice(i, 1);
				}
			}

			let b = new FireParticle(this.position.x, this.position.y, this.position.z, random(1, 3));
			ballParticles.push(b);
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
			/*
			if (distance < threshold) {
				let para = createP("FIREBALL INCOMING!!");
				para.class("fireball-notification");
	
				setTimeout(function() {
					para.style("display", "none");
				}, 2000);
			}*/

			if( (player.position.y - player.dimensions.y / 2) <= (this.position.y + this.radius) &&  // player top
				(player.position.x - player.dimensions.x / 2) <= (this.position.x + this.radius) &&  // player left
				(player.position.x + player.dimensions.x / 2) >= (this.position.x - this.radius) &&  // player right
				(player.position.z - player.dimensions.z / 2) <= (this.position.z + this.radius) &&  // player front
				(player.position.z + player.dimensions.z / 2) >= (this.position.z - this.radius)     // player back
			){
				console.log("fireball hit");
				player.takeHit();
			}
		}
	}

class Maze {
	constructor(size1, size2) {
		this.blocks = new Array(size1);
		this.size1 = size1; 
		this.size2 = size2;
		for (let i = 0; i < size1; i++) {
		  this.blocks[i] = new Array(size2);
		  for (let j = 0; j < size2; j++) {
			let x = i * 5;
			let y = 0;
			let z = j * 5;
			this.blocks[i][j] = new Block(x, y, z, 5, 5, 5, null);
		  }
		}

		this.start = this.blocks[1][5];

		for (let i = 0; i < size1; i++){
			for (let j = 0; j < size2; j++){
				if (i==0 || j == 0 || i == size1-1 || j == size2-1) this.blocks[i][j].dimensions.y=20;
					else if(i > 2 && j > 0){
						this.blocks[i][j].texture = lava;
						this.blocks[i][j].dimensions.y = 4
					}  else this.blocks[i][j].texture = metal;
						if(i > 16 && j < 5 && j != 0 && i != 0 && i != size1-1 && j != size2-1){
							this.blocks[i][j].texture = metal;
							this.blocks[i][j].dimensions.y = 12;
						}
						this.blocks[7][6].texture = rock;
						this.blocks[10][6].texture = rock;
						this.blocks[13][10].texture = rock;
						this.blocks[17][10].texture = rock;
						this.blocks[18][8].texture = rock;
						this.blocks[18][6].texture = rock;
						this.blocks[13][8].texture = rock;
						this.blocks[3][1].texture = metal;
						this.blocks[6][1].texture = rock;
						this.blocks[6][3].texture = rock;
						this.blocks[6][1].dimensions.y = 6;
						this.blocks[6][3].dimensions.y = 7;
						this.blocks[7][6].dimensions.y = 7;
						this.blocks[3][1].dimensions.y = 5;
						this.blocks[10][6].dimensions.y = 8;
						this.blocks[18][8].dimensions.y = 10;
						this.blocks[18][6].dimensions.y = 11;
						this.blocks[13][10].dimensions.y = 10;
						this.blocks[17][10].dimensions.y = 10;
						this.blocks[13][8].dimensions.y = 8;
			}
		}
  	}


  	update(fireball) {
		for (let i = 0; i < this.blocks.length; i++) {
			for (let j = 0; j < this.blocks[i].length; j++) {
				this.blocks[i][j].update('none');
			}
		}

		for (let i = 0; i < this.blocks.length; i++) {
			for (let j = 0; j < this.blocks[i].length; j++) {
				for(let k = 0; k<fireball.length; k++){
					if(fireball[k].blockx == i && fireball[k].blockz == j)
						this.blocks[i][j].update('red');
				}
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
		let playerPos = player.playerArrayPosition(player.position.x, player.position.y, 5);
		let radius = 5;

		let startX = Math.max(0, playerPos.x - radius);
		let endX = Math.min(this.blocks.length - radius, playerPos.x + radius);
		let startZ = Math.max(0, playerPos.z - radius);
		let endZ = Math.min(this.blocks[startX].length - radius, playerPos.z + radius);
		
		for (let i = startX; i <= endX; i+= radius) {
			for (let j = startZ; j <= endZ; j+= radius) {
				let block = this.blocks[i][j];
				if (this.blocks[i][j].texture === lava) {
					let playerLeft = player.position.x - player.dimensions.x / 2;
					let playerRight = player.position.x + player.dimensions.x / 2;
					//let playerTop = player.position.y - player.dimensions.y / 2;
					let playerBottom = player.position.y + player.dimensions.y / 2;
					let playerFront = player.position.z - player.dimensions.z / 2;
					let playerBack = player.position.z + player.dimensions.z / 2;

					let blockLeft = block.position.x - block.dimensions.x / 2;
					let blockRight = block.position.x + block.dimensions.x / 2;
					let blockTop = block.position.y - block.dimensions.y / 2;
					//let blockBottom = block.position.y + block.dimensions.y / 2;
					let blockFront = block.position.z - block.dimensions.z / 2;
					let blockBack = block.position.z + block.dimensions.z / 2;
				// Assuming the player has a radius, you need to adjust the collision detection
				if (
						playerBottom >= blockTop &&
						playerRight >= blockLeft &&
						playerLeft <= blockRight &&
						playerBack >= blockFront &&
						playerFront <= blockBack //&&
						//playerTop <= blockBottom
					) {
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
