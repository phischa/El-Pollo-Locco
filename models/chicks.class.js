class Chicks extends Chicken {

    width = 40;
    height = 50;
    y = 370;
    chickenInterval;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 600 + Math.random() * 1800;
        this.speed = 0.2 + Math.random() * 0.5;
        this.energy = 1;
        this.visible = true; // Set the visible property to false after 1 second
        this.collidable = true;
        this.animateWalk();
    }


    switchAnimation() {
        setInterval(() => {
            if (this.chickenIsDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.stopMovement();
                this.stopPlayAnimation();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    stopPlayAnimation() {
        setTimeout(() => {
            this.visible = false; // Set the visible property to false after 1 second
            this.collidable = false;
        }, 1000);
    }
}