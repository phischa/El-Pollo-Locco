class Character extends MoveableObject {

    world;
    height = 300;
    y = 40;
    speed = 5;
    walking_sound = new Audio('audio/walking.mp3');

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

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animateWalk();
        this.changeWalkingSound();
        this.switchAnimation();
        this.animateJump();
    }

    animateWalk() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
            } 
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 80;
        }, 1000 / 120);
    }

    changeWalkingSound() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x && !this.isAboveGround() || this.world.keyboard.LEFT && this.x > 0 && !this.isAboveGround()) {
                this.playWalkingSound();
            } else {
                this.pauseWalkingSound();
            }
            this.world.camera_x = -this.x + 80;
        }, 1000 / 120);
    }

    switchAnimation() {
        let animeInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.endGame(animeInterval);
                }, 500);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 70);
    }

    animateJump() {
        setInterval(() => {
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump()
            }
        }, 1000 / 120);
    }

    playWalkingSound() {
        this.walking_sound.play();

        /* if (this.walking_sound.paused) {
            this.walking_sound.play().catch(error => {
                console.error('Fehler beim Abspielen des Sounds:', error);
            });
            this.walking_sound.addEventListener('ended', () => {
                this.walking_sound.currentTime = 0;
                this.walking_sound.play();
            });
        } */
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

    pauseWalkingSound() {
        this.walking_sound.pause();
    }

    jump() {
        this.speedY = 25;
    }

    endGame(animeInterval) {
        clearInterval(animeInterval);
        document.getElementById('end-screen').style.display = 'flex';
    }
}