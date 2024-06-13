class StatusBarBottle extends DrawableObject {

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 10;
        this.y = 5;
        this.width = 180
        this.height = 50;
        this.setBottles(0);
    }

    /**
 * Sets the number of bottles and updates the image accordingly.
 * @param {number} bottleNumber - The number of bottles to set.
 */
    setBottles(bottleNumber) {
        this.bottleNumber = bottleNumber;
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the current number of bottles.
     * @returns {number} The index of the image corresponding to the current number of bottles.
     */
    resolveImageIndex() {
        if (this.bottleNumber == 0) {
            return 0;
        } else if (this.bottleNumber == 1) {
            return 1;
        } else if (this.bottleNumber == 2) {
            return 2;
        } else if (this.bottleNumber == 3) {
            return 3;
        } else if (this.bottleNumber == 4) {
            return 4;
        } else {
            return 5;
        }
    }

}