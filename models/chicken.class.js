class Chicken extends MoveableObject {
    
    width = 60;
    height = 90;
    y = 340;
    energy = 1;

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
        this.loadImages(this.IMAGES_DEAD);
        this.x = 800 + Math.random() * 2500;
        this.speed = 0.2 + Math.random() * 0.5;
        this.animateWalk();
    }

    animateWalk() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            if (this.chickenIsDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    chickenIsDead(enemy) {
        return this.energy === 0;
    }
}
    