export class Entity {
    rotation = 0;
    constructor(props) {
        this.x = props.x;
        this.y = props.y;
        this.image = props.image;
        this.id = props.id;
    }

    drawPoint(ctx, pointSize, color) {
        const x = this.x;
        const y = this.y;
        ctx.save();
        ctx.fillStyle = color;
        ctx.beginPath(); //Start path
        ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        ctx.fill(); // Close the path and fill.
        ctx.restore();
    }
}