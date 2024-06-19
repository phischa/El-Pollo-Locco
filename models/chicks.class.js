class Chicks extends Chicken {

    width = 40;
    height = 50;
    y = 370;
    chickenInterval;

    offset = {
        top: 30,
        right: 0,
        bottom: 20,
        left: 0,
    };

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
        this.x = 600 + Math.random() * 1600;
        this.speed = 0.2 + Math.random() * 0.5;
        this.energy = 1;
        this.visible = true;
        this.collidable = true;
        this.animateWalk();
    }

    /**
 * Switches the animation between walking and dead states.
 */
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

/**
 * Stops the animation of the chicken and makes it invisible after a delay.
 */
stopPlayAnimation() {
    setTimeout(() => {
        this.visible = false; 
        this.collidable = false;
    }, 1000);
}

}