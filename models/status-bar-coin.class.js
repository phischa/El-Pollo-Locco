class StatusBarCoin extends DrawableObject {

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png',
    ]

    percentage = 0;

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 10;
        this.y = 40;
        this.width = 180
        this.height = 50;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.percentage == 0) {
            return 0;
        } else if (this.percentage > 20) {
            return 1;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 80) {
            return 4;
        } else {
            return 5;
        }
    }
}
