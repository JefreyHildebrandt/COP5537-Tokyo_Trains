import {Parser} from "../../core/Parser";
import {EntityManager} from "../EntityManager";

export class StationManager extends EntityManager {

    constructor() {
        super();
        this.stationMap = Parser.getNodes();
    }

    getNodeSizeExtremes() {
        let largestX = 0;
        let largestY = 0;
        let smallestX = Infinity;
        let smallestY = Infinity;
        this.stationMap.forEach(value => {
            largestX = value.x > largestX ? value.x : largestX;
            largestY = value.y > largestY ? value.y : largestY;

            smallestX = value.x < smallestX ? value.x : smallestX;
            smallestY = value.y < smallestY ? value.y : smallestY;
        });

        return {largestX: largestX, largestY: largestY, smallestX: smallestX, smallestY: smallestY};
    }

    scaleStations(subtractX, subtractY) {
        this.stationMap.forEach((value, key) => {
            const readjustedValue = value;
            readjustedValue.x -= subtractX;
            readjustedValue.y -= subtractY;
            this.stationMap.set(key, readjustedValue);
        });
    }

    drawStations(canvas) {
        this.stationMap.forEach(station => {
            this.drawCoordinates(canvas.ctx, station);
        });
    }

    drawCoordinates(ctx, station) {
        const x = station.x;
        const y = station.y;
        var pointSize = 6; // Change according to the size of the point.
        const numPeopleAtStation = station.peopleAtStation.length;
        ctx.save();
        ctx.fillStyle = numPeopleAtStation > 0 ? "orange" : "black";
        ctx.beginPath(); //Start path
        ctx.arc(x, y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
        ctx.fill(); // Close the path and fill.
        ctx.restore();
        if(numPeopleAtStation > 0) {
            this.drawTextAbovePoint(ctx, station.peopleAtStation.length, x, y);
        }
    }

    drawTextAbovePoint(ctx, text, x, y) {
        ctx.save();
        const fontSize = 15;
        ctx.font = fontSize + "px Verdana";
        ctx.fillText(text, x, y + fontSize + 5);
        ctx.restore();
    }

}