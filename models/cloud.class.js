class Cloud extends MoveableObject {
    y = 10;
    width = 400;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = 200 + Math.random() * 2200;
        this.moveCloud();
    }

    moveCloud() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 30);
    }
}