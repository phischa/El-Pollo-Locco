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
        bottom: 40,
        left: 20,
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
        this.speed = 20;
        this.energy = 100;
        this.x = 2300;
        this.visible = true;
        this.collidable = true;
        this.animate();
        this.animateHurt();
        this.animateDead();
    }

    /**
  * Starts the boss alert animation logic.
  */
    animate() {
        this.bossAlert = setInterval(this.animateLogic.bind(this), 200);
    }

    /**
     * The logic for the boss animations, changing states based on certain conditions.
     */
    animateLogic() {
        if (!this.hadFirstContact && world.character.x > 1500) {
            this.hadFirstContact = true;
            this.i = 0;
        }
        if (this.i < 4) {
            this.playAnimation(this.IMAGES_WALKING);
        } else if (this.i < 12) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.i < 20) {
            this.playAnimation(this.IMAGES_ATTACK);
            this.attack();
        }
        this.i++;
    }

    /**
     * Initiates the boss attack behavior.
     */
    attack() {
        if (this.hadFirstContact) {
            clearInterval(this.bossAlert);
            this.bossAttackInterval = setInterval(() => {
                this.playAnimation(this.IMAGES_WALKING);
                this.moveLeft();
            }, 200);
        }
    }

    /**
     * Animates the boss hurt state and resumes attack after being hurt.
     */
    animateHurt() {
        this.bossHurtInterval = setInterval(() => {
            if (this.bossHurt) {
                clearInterval(this.bossAttackInterval);
                this.playAnimation(this.IMAGES_HURT);
                this.attack();
            }
        }, 200);
    }

    /**
     * Animates the boss dead state and triggers the win game sequence.
     */
    animateDead() {
        this.bossDeadInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                clearInterval(this.bossAttackInterval);
                clearInterval(this.bossHurtInterval);
                setTimeout(() => {
                    this.winGame();
                }, 2050);
            }
        }, 150);
    }

    /**
     * Ends the game with a win screen and stops all boss animations.
     */
    winGame() {
        clearAllIntervals();
        walkingSound.pause();
        music.pause();
        document.getElementById('win-screen').style.display = 'flex';
    }
}