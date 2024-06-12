class ThrowableObject extends MoveableObject {

    splash = false;
    movingInterval;
    rotationInterval;

    IMAGES_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ]

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_ROTATION);
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.throw(x, y);
    }

    /* throw(x, y) {
        this.speedY = 20;
        this.applyGravity();
        setInterval(() => {
            this.x += 18;
        }, 25);
        setInterval(() => {
            this.rotationInterval = this.playAnimation(this.IMAGES_ROTATION);
        }, 1000 / 120);
    } */
    
    throw(x, y) {
        this.speedY = 20;
        this.applyGravity();
        this.movingInterval = setInterval(() => {
            this.x += 18;
        }, 25);
        this.rotationInterval = setInterval(() => {
            if (!this.splash) {
                this.playAnimation(this.IMAGES_ROTATION);
            }
        }, 1000 / 120);
    }


    playSplash() {
        clearInterval(this.rotationInterval);
        clearInterval(this.movingInterval);
        this.splash = true;
        this.splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_SPLASH);
        }, 1000 / 60);
        setTimeout(() => {
            clearInterval(this.splashInterval);
            // You can remove the object or stop the splash animation after a certain period
        }, this.IMAGES_SPLASH.length * 100); // assuming each frame lasts 100ms
    }
}