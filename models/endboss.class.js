class Endboss extends MoveableObject {

    y = 60;
    height = 400;
    width = 250;
    hadFirstContact = false;
    bossAlert;
    bossAttackInterval;
    bossDeadInterval;
    bossHurt = false;

    offset = {
        top: 60,
        right: 10,
        bottom: 0,
        left: 10,
    };

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.speed = 15;
        this.energy = 100;
        this.x = 2400;
        this.visible = true;
        this.collidable = true;
        this.animate();
        this.animateHurt();
        this.animateDead();
    }

    animate() {
        let i = 0;
        this.bossAlert = setInterval(() => {
            if (i < 4) {
                this.playAnimation(this.IMAGES_WALKING);
            } else if (i < 12) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (i < 20) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.attack();
            }
            i++;
            if (world.character.x > 1600 && !this.hadFirstContact) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 200);
    }

    attack() {
        if (this.hadFirstContact) {
            clearInterval(this.bossAlert);
            this.bossAttackInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            }, 200);
        }
    }

    animateHurt() {
        this.bossHurtInterval = setInterval(() => {
            if (this.bossHurt) {
                clearInterval(this.bossAttackInterval);
                this.playAnimation(this.IMAGES_HURT);
                this.attack();
            }
        }, 200);
    }

    animateDead() {
        this.bossDeadInterval = setInterval(() => {
            if (this.isDead()) {
                clearInterval(this.bossAttackInterval);
                clearInterval(this.bossHurtInterval);
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.winGame();
                }, 2000);
            }
        }, 200);
    }

    winGame() {
        clearInterval(this.bossDeadInterval);
        music.pause();
        document.getElementById('win-screen').style.display = 'flex';
    }
}