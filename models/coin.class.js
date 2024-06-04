class Coin extends CollectableObject {

    world;
    height = 110;
    width = 110;
    y = this.y;

    offset = {
        top: 30,
        right: 60,
        bottom: 60,
        left: 30,
    };

    COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COIN);
        const randomX = 300 + Math.random() * (1800 - 300);
        this.x = randomX;
        this.y = Math.random() < 0.5 ? 100 : 130;
        this.switchAnimation();
    }

    switchAnimation() {
        setInterval(() => {
            this.playAnimation(this.COIN);
        }, 500);
    }
}