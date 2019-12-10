export class Canvas {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.id = 'trainCanvas';

        this.createCanvas();
    }

    /**
     * Creates the canvas which contains all of the imagery
     */
    createCanvas() {
        const canvas = document.createElement('canvas');
        canvas.id = this.id;
        canvas.width = this.width || window.devicePixelRatio;
        canvas.height = this.height || window.devicePixelRatio;
        canvas.style.width = this.width + 'px';
        canvas.style.height = this.height + 'px';

        this.ctx = canvas.getContext("2d");
        this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

        document.body.appendChild(canvas);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}