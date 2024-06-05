class DrawableObject {

    world;
    x = 20;
    y = 225;
    height = 200;
    width = 120;
    img;
    imageCache = {};
    currentImage = 0;

    offset = {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    
    drawFrame(ctx) {

        if (this instanceof Character || this instanceof CollectableObject || this instanceof Coin || this instanceof Chicken || this instanceof Chicks || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'red';
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.right, this.height - this.offset.bottom);
            ctx.stroke();
        }

        /* if (this instanceof Character || this instanceof Chicken || this instanceof Chicks || this instanceof CollectableObject || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '2';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } */
    }
}