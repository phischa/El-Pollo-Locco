class Character extends MoveableObject {

    world;
    height = 300;
    y = 135;
    speed = 10;
    walking_sound = new Audio('audio/walking.mp3');
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animateWalk();
    }

    animateWalk() {
        setInterval(() => {
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                this.playWalkingSound();
            } else {
                this.pauseWalkingSound();
            }
            if (this.world.keyboard.LEFT && this.x > 0) {
                this.x -= this.speed;
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 80;
        }, 1000 / 120);

        setInterval(() => {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];
                this.img = this.imageCache[path];
                this.currentImage++;
            }
        }, 100);
    }

    playWalkingSound() {
        if (this.walking_sound.paused) {
            this.walking_sound.play().catch(error => {
                console.error('Fehler beim Abspielen des Sounds:', error);
            });
            this.walking_sound.addEventListener('ended', () => {
                this.walking_sound.currentTime = 0;
                this.walking_sound.play();
            });
        }
    }

    pauseWalkingSound() {
        this.walking_sound.pause();
    }

    jump() {

    }
}