class MoveableObject {
    x = 20;
    y = 225;
    img;
    height = 200;
    width = 120;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}