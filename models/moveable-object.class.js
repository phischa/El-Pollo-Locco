class MoveableObject extends DrawableObject {

    world;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    play;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    /**
     * Plays an animation by cycling through the given images.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Starts playing an animation at a set interval.
     * @param {string[]} images - Array of image paths.
     */
    play(images) {
        this.playInterval = setInterval(() => {
            this.playAnimation(images);
        }, 500);
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Applies gravity to the object.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
            if (this.y > 130 && this instanceof Character) {
                this.y = 130;
            }
        }, 1000 / 25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 120;
        }
    }

    /**
     * Checks if the object is colliding with another object.
     * @param {MoveableObject} mo - The other moveable object.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        const isColliding = mo.collidable && this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
        return isColliding;
    }

    /* isColliding(mo) {
        const isColliding = mo.collidable && this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        return isColliding;
    } */

    /**
     * Checks if the object is colliding with a boss object.
     * @param {MoveableObject} mo - The boss moveable object.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isCollidingBoss(mo) {
        const isColliding = this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x + mo.width &&
            this.y < mo.y + mo.height;
        return isColliding;
    }

    /**
     * Reduces the object's energy when hit.
     */
    hit() {
        this.energy -= 10;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the object's energy when hit.
     */
    hitHard() {
        this.energy -= 50;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt (i.e., hit within the last second).
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
     * Checks if the object is dead (i.e., energy is 0).
     * @returns {boolean} True if the object is dead, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }
}