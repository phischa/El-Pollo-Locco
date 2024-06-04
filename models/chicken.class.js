class Chicken extends MoveableObject {

    width = 60;
    height = 90;
    y = 340;
    chickenInterval;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD, 'dead-image');
        this.x = 600 + Math.random() * 1800;
        this.speed = 0.2 + Math.random() * 0.5;
        this.energy = 1;
        this.visible = true;
        this.collidable = true;
        this.animateWalk();
    }

    animateWalk() {
        this.chickenInterval = setInterval(() => {
            if (this.visible) { // Only move if the chicken is visible
                this.moveLeft();
            }
        }, 1000 / 60);
        this.switchAnimation();
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

    chickenIsDead() {
        return this.energy === 0;
    }

    /**
     * stops movement intervall
     */
    stopMovement() {
        clearInterval(this.chickenInterval);
    }

    stopPlayAnimation() {
        this.collidable = false;
        setTimeout(() => {
            this.visible = false; // Set the visible property to false after 1 second
        }, 500);
    }

    draw(ctx) {
        if (this.visible) { // Draw the chicken only if it's visible
            super.draw(ctx);
        }
    }
}
