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
  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    texture(this.texture);
    noStroke();
    sphere(this.radius);
    //console.log(lava);
    pop();
  }
  update() { 
    this.position.y = this.position.y+1; 
    if(this.position.y>10) {
    this.position.y = -100;
    this.position.x = random(10,100);
    this.position.z = random(10,50);
    }
  }

}

class Maze {
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
    player.position = p5.Vector.add(this.start.position, createVector(15, 15, 15));
  }
}

//TODO: We may want to eventually refactor this into a separate file. 
//what follows are the functions involved in detecting collisions
//code is taken from this example: https://editor.p5js.org/rjgilmour/sketches/1_pX_xPfD
//TODO: understand what this function does
function sdfTriangle(cameraPosition, a, b, c)
{ //This is a signed distance function
  let baDistance = math.subtract(b, a); 
  let CAMaDistance = math.subtract(cameraPosition, a);
  let cbDistance = math.subtract(c, b); 
  let CAMbDistance = math.subtract(cameraPosition, b);
  let acDistance = math.subtract(a, c); 
  let CAMcDistance = math.subtract(cameraPosition, c);
  let nor = math.cross(baDistance, acDistance);

  return math.sqrt(
    (math.sign(math.dot(math.cross(baDistance,nor),CAMaDistance)) +
     math.sign(math.dot(math.cross(cbDistance,nor),CAMbDistance)) +
     math.sign(math.dot(math.cross(acDistance,nor),CAMcDistance))<2.0)
     ?
     math.min( math.min(
     dot2(math.subtract(math.multiply(baDistance, constrain(math.dot(baDistance,CAMaDistance)/dot2(baDistance),0.0,1.0)), CAMaDistance)),
     dot2(math.subtract(math.multiply(cbDistance, constrain(math.dot(cbDistance,CAMbDistance)/dot2(cbDistance),0.0,1.0)), CAMbDistance)) ),
     dot2(math.subtract(math.multiply(acDistance, constrain(math.dot(acDistance,CAMcDistance)/dot2(acDistance),0.0,1.0)), CAMcDistance)) )
     :
     math.dot(nor,CAMaDistance)*math.dot(nor,CAMaDistance)/dot2(nor) );
}

function projectToPlane(v, n){
  let vProjN = math.multiply( math.dot(v, n) / (dot2(n)**2) , n)
  return math.subtract(v, vProjN)
}

function dot2(v) {
  return math.dot(v, v)
}

function detectCollision(cameraPositionVector, objectModelGeometry, thresh) {
  for(let i = 0; i < objectModelGeometry.faces.length; i++){
    //for every face of the model (each triangle that it consists of)
    // set three variables a, b, and c to be the Vertices consisting of that face
    // x, y, z are the positions of each vertex in space
    let a = [
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][0] ].x,
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][0] ].y,
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][0] ].z,
    ]
    let b = [
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][1] ].x,
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][1] ].y,
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][1] ].z,
    ]
    let c = [
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][2] ].x,
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][2] ].y,
      objectModelGeometry.vertices[ objectModelGeometry.faces[i][2] ].z,
    ]
    //determine whether the camera is close to the face being iterated over
    if( sdfTriangle(cameraPositionVector, a, b, c) < thresh) {
      return true
    }
  }
  return false;
}
// end of code from tutorial

class MSB {
  //position - a vector specifying the position of the model
  //path - the relative path to the .obj file
  constructor(x, y , z, path) {
    this.model = loadModel(path);
    this.position = createVector(x,y,z);
  }

  reflectXAxis(){
    for (let i = 0; i<this.model.getChileCount(); i++){
      let child = this.model.getChild(i);
      if (child instanceof p5.Geometry){
        for (let j = 0; j < child.vertices.length; j++) {
          child.verticies[j].x *= -1;
        }
      }
    }
  }

  update(cameraPosition, velocity) {
    //VARIABLES FOR COLLISION DETECTION HANDLING
    let inputVector = [velocity.x, velocity.y, velocity.z]
    let camTh = atan2(cameraPosition[2], cameraPosition[0])
    let inputTh = atan2(inputVector[1], inputVector[0])
    let polys = this.model
    let inputMag = dist(0, 0, inputVector[0], inputVector[1])
    let input3D = [inputMag * cos(camTh + inputTh), 
                   0, 
                   inputMag * sin(camTh + inputTh)]
    //END OF VARIABLES FOR COLLISION DETECTION HANDLING
    let collision = detectCollision(cameraPosition, this.model, 10)
    if (collision) {
      let i = collision-1 //TOD: this should NOT be a single letter identifier
      player.grounded = true;
      console.log("collision")
      //START OF COLLISION DETECTION HANDLING
      let head = [cos(camTh + inputTh), 0, sin(camTh + inputTh)]
      let normal = [
        polys.vertexNormals[polys.faces[i][0]].x,
        polys.vertexNormals[polys.faces[i][0]].y,
        polys.vertexNormals[polys.faces[i][0]].z
      ]
      
      let proj = projectToPlane(head, normal)
      
      let projMag = sqrt(dot2(proj))
      input3D = [proj[0] * inputMag / projMag, proj[1] * inputMag / projMag, proj[2] * inputMag / projMag]
      
      
      let a = [
        polys.vertices[ polys.faces[i][0] ].x,
        polys.vertices[ polys.faces[i][0] ].y,
        polys.vertices[ polys.faces[i][0] ].z
      ]
      let b = [
        polys.vertices[ polys.faces[i][1] ].x,
        polys.vertices[ polys.faces[i][1] ].y,
        polys.vertices[ polys.faces[i][1] ].z
      ]
      let c = [
        polys.vertices[ polys.faces[i][2] ].x,
        polys.vertices[ polys.faces[i][2] ].y,
        polys.vertices[ polys.faces[i][2] ].z
      ]
      
      // d for distance here
      let result = cameraPosition
      let d = sdfTriangle(result, a, b, c)
      if ( d < 10){
        let diff = d - r + 0.01;
        result[0] -= diff * normal[0]
        result[1] -= diff * normal[1]
        result[2] -= diff * normal[2]
      }
      //END OF COLLISION DETECTION HANDLING
      return result
    }
  }

  display() {
    push();
    //translate(this.position.x, this.position.y, this.position.z);
    //rotateX(PI);
    model(this.model);
    scale(1);
    //translate();
    pop();
  }

  setPlayerAtStart(player) {
    player.position = p5.Vector.add(this.position, createVector(0, -15, 0))
  }

}
