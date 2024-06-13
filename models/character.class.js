class Character extends MoveableObject {

    world;
    height = 300;
    y = 40;
    speed = 5;
    walkingSound = new Audio('audio/walking.mp3');
    walkingInterval;
    walkingSoundInterval;
    animeInterval;
    inactivityTimeout;
    inactivityTime = 0; // Track inactivity time
    isThrowing = false; // Flag to indicate throwing action

    offset = {
        top: 110,
        right: 20,
        bottom: 110,
        left: 10,
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ]

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png',
    ]

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png',
    ]

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.initAnimation();
    }
    /**
     * function initiates the different animation functions.
     */
    initAnimation() {
        this.animateWalk();
        this.changeWalkingSound();
        this.switchAnimation();
        this.animateJump();
    }

    /**
     * function animates the walking of the character.
     */
    animateWalk() {
        this.walkingInterval = setInterval(() => {
            this.handleMovement();
            this.updateInactivityTime();
            this.updateCamera();
        }, 1000 / 120);
    }

    /**
     * function tests if the character is moving to the right or the left.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
        }
    }

    /**
     * function updates the time of inactivity.
     */
    updateInactivityTime() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT || this.isThrowing) {
            this.inactivityTime = 0; // Reset inactivity time on movement or throwing
        } else {
            this.inactivityTime += 1000 / 120; // Increment inactivity time
        }
    }

    /**
     * function updates the camera based on the characters x.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 80;
    }

    /**
     * function plays or pauses the walking sound of the character.
     */
    changeWalkingSound() {
        this.walkingSoundInterval = setInterval(() => {
            if ((this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isAboveGround()) ||
                (this.world.keyboard.LEFT && this.x > 0 && !this.isAboveGround())) {
                this.walkingSound.play();
            } else {
                this.walkingSound.pause();
            }
        }, 1000 / 120);
    }

    /**
     * function sets the interval for the updateAnimation().
     */
    switchAnimation() {
        this.animeInterval = setInterval(() => {
            this.updateAnimation();
        }, 70);
    }

    /**
     * function updates the animation based on the status of the character.
     * @param {handle} animeInterval 
     */
    updateAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.endGame(this.animeInterval);
            }, 500);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.playIdleAnimation();
        }
    }

    /**
     * function updates the animation based on the inactivity time of the character.
     */
    playIdleAnimation() {
        if (!this.isThrowing) {
            if (this.inactivityTime >= 6000) {
                this.playAnimation(this.IMAGES_LONG_IDLE);
            } else if (this.inactivityTime >= 3000) {
                this.playAnimation(this.IMAGES_IDLE);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        } else {
            this.loadImage('img/2_character_pepe/2_walk/W-21.png');
        }
    }

    /**
     * function checks if the character is jumping.
     */
    animateJump() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
        }, 1000 / 120);
    }

    /**
     * function returns the collision of the character with the bottles.
     * @param {object} mo 
     * @returns 
     */
    collisionWithBottle(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height > mo.y &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
    }

    /**
    * function returns the collision of the character with the coins.
    * @param {object} mo 
    * @returns 
    */
    collisionWithCoin(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * function defines the jumping speed.
     */
    jump() {
        this.speedY = 25;
    }

    /**
     * function clears intervals, stops music and shows the end screen.
     * @param {handle} animeInterval 
     */
    endGame() {
        clearInterval(this.animeInterval);
        music.pause();
        clearInterval(this.walkingSoundInterval);
        clearInterval(this.walkingInterval);
        document.getElementById('end-screen').style.display = 'flex';
    }
}


