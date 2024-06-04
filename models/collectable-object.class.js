class CollectableObject extends MoveableObject {

    world;
    height = 90;
    width = 110;
    y = 340;

    offset = {
        top: 0,
        right: 30,
        bottom: 0,
        left: 20,
    };

    BOTTLE_SOIL = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.loadImages(this.BOTTLE_SOIL);
        this.x = 300 + Math.random() * 1800;
        this.switchAnimation();
    }

    switchAnimation() {
        setInterval(() => {
            this.playAnimation(this.BOTTLE_SOIL);
        }, 500);
    }
}