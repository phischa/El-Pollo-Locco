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
        this.x = 600 + Math.random() * 1600;
        this.speed = 0.2 + Math.random() * 0.5;
        this.energy = 1;
        this.visible = true;
        this.collidable = true;
        this.animateWalk();
    }

    /**
 * Animates the walking of the chicken by moving it to the left.
 */
    animateWalk() {
        this.chickenInterval = setInterval(() => {
            if (this.visible) { 
                this.moveLeft();
            }
        }, 1000 / 60);
        this.switchAnimation();
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
     * Checks if the chicken is dead.
     * @returns {boolean} True if the chicken's energy is 0, false otherwise.
     */
    chickenIsDead() {
        return this.energy === 0;
    }

    /**
     * Stops the movement interval of the chicken.
     */
    stopMovement() {
        clearInterval(this.chickenInterval);
    }

    /**
     * Stops the animation of the chicken and makes it invisible after a delay.
     */
    stopPlayAnimation() {
        this.collidable = false;
        setTimeout(() => {
            this.visible = false; 
        }, 500);
    }

    /**
     * Draws the chicken on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.visible) { 
            super.draw(ctx);
        }
    }
}