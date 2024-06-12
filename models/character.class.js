class Character extends MoveableObject {

    world;
    height = 300;
    y = 40;
    speed = 5;
    walkingSound = new Audio('audio/walking.mp3');
    walkingInterval;
    walkingSoundInterval;
    inactivityTimeout;
    inactivityTime = 0; // Add this variable to track inactivity time

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

    initAnimation() {
        this.animateWalk();
        this.changeWalkingSound();
        this.switchAnimation();
        this.animateJump();
    }

    animateWalk() {
        this.walkingInterval = setInterval(() => {
            this.handleMovement();
            this.updateInactivityTime();
            this.updateCamera();
        }, 1000 / 120);
    }

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

    updateInactivityTime() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.inactivityTime = 0; // Reset inactivity time on movement
        } else {
            this.inactivityTime += 1000 / 120; // Increment inactivity time
        }
    }

    updateCamera() {
        this.world.camera_x = -this.x + 80;
    }

    changeWalkingSound() {
        this.walkingSoundInterval = setInterval(() => {
            this.handleWalkingSound();
        }, 1000 / 120);
    }

    handleWalkingSound() {
        if ((this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isAboveGround()) || 
            (this.world.keyboard.LEFT && this.x > 0 && !this.isAboveGround())) {
            this.walkingSound.play();
        } else {
            this.walkingSound.pause();
        }
    }

    switchAnimation() {
        let animeInterval = setInterval(() => {
            this.updateAnimation(animeInterval);
        }, 70);
    }

    updateAnimation(animeInterval) {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            setTimeout(() => {
                this.endGame(animeInterval);
            }, 500);
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.playIdleAnimation();
        }
    }

    playIdleAnimation() {
        if (this.inactivityTime >= 6000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
        } else if (this.inactivityTime >= 3000) {
            this.playAnimation(this.IMAGES_IDLE);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    animateJump() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
        }, 1000 / 120);
    }

    collisionWithBottle(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height > mo.y &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
    }

    collisionWithCoin(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    jump() {
        this.speedY = 25;
    }

    endGame(animeInterval) {
        clearInterval(animeInterval);
        music.pause();
        clearInterval(this.walkingSoundInterval);
        clearInterval(this.walkingInterval);
        document.getElementById('end-screen').style.display = 'flex';
    }
}

