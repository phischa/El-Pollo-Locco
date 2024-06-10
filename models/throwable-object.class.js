class ThrowableObject extends MoveableObject {

    bottles = [];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 60; 
        this.height = 60;
        this.throw(x, y);
    }

    throw(x, y) {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += 18;
        }, 25);
    }
}