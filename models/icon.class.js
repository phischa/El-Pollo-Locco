class Icon extends DrawableObject {

    ICON = [
        'img/icons/expand.png',
    ]

    constructor() {
        super().loadImage('img/icons/expand.png');
        this.x = 680;
        this.y = 444;
        this.height = 20;
        this.width = 20;
        this.onClick = this.onClick.bind(this);
        canvas.addEventListener('click', this.onClick);
        this.onHover = this.onHover.bind(this);
        canvas.addEventListener('mousemove', this.onHover);
    }

    onClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        if (mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) {
            this.isClicked();
        }
    }

    onHover(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        if (mouseX >= this.x && mouseX <= this.x + this.width &&
            mouseY >= this.y && mouseY <= this.y + this.height) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }

    isClicked() {
            this.enterFullscreen();
        }
} 
