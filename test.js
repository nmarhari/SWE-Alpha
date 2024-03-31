let bugs = [];
let numBugs = 40;

function setup() {
	canvas = createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw(){
    frameRate(60);
    background(0, 0, 51);

    for(let i = bugs.length -1; i>= 0; i--){
        bugs[i].move(5,-5,5);
     bugs[i].show();
     bugs[i].shrink();
     
     if(bugs[i].radius <= 0 ){
       //remove the dead ones
       bugs.splice(i, 1);
     }
     
   }
   
   // make more fire!!!
     let x = 0;
     let y = 300;
     let z = 0;
     let radius = random(30,50);
     let b = new Bug(x, y, z, radius);
     bugs.push(b);
 
}