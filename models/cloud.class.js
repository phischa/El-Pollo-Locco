class Cloud extends MoveableObject {
    y = 10;
    width = 400;
    height = 250;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 600;
        this.moveCloud();
    }

    moveCloud() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
        if (this.x < -300) {
            this.x = 600;
        }
    }
}