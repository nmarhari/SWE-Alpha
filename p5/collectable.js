class Collectable{
    constructor(x, y, z, size, model){
        this.position = createVector(x, y, z);
        this.size = size; // size of model
        this.draw = true;
        this.model = model;
    }

    display() {
        if(this.draw){
            push();
			translate(this.position.x, this.position.y, this.position.z);
			scale(this.size);
			rotateX(frameCount * 0.01); // Add rotation for visual interest
			rotateY(frameCount * 0.01);
			model(this.model);
			pop();
        }
    }

    remove(){
        this.draw = false;
    }

    show(){
        this.draw = true;
    }
}