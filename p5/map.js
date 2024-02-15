// Ported to JS from github.com/jrc03c/queasycam/tree/master/examples/MazeRunner
class Block {
    constructor(x, y, z, w, h, d) {
      this.position = createVector(x, y, z);
      this.dimensions = createVector(w, h, d);
      this.fillColor = color(random(150, 200));
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
      fill(this.fillColor);
      box(this.dimensions.x, this.dimensions.y, this.dimensions.z);
      pop();
    }
  
    moveDown() {
      this.position.y += 5;
    }
  }
  
  class Maze {
    constructor(size) {
      this.blocks = new Array(size);
  
      for (let i = 0; i < size; i++) {
        this.blocks[i] = new Array(size);
        for (let j = 0; j < size; j++) {
          let x = i * 15;
          let y = 0;
          let z = j * 15;
          this.blocks[i][j] = new Block(x, y, z, 15, 15, 15);
        }
      }
  
      this.start = this.blocks[1][1];
      this.blocks[1][1].fillColor = color(63, 127, 63);
      var m = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ];
      for (let i = 1; i < size - 1; i++)
        for (let j = 1; j < size - 1; j++)
          if (m[i][j]) this.blocks[i][j].moveDown();
          else this.blocks[i][j].fillColor = color(127);
      this.blocks[3][3].fillColor = color(127, 63, 63);
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
  }