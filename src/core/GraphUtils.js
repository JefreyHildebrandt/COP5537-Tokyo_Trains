import {StationManager} from '../entity/station/StationManager';
import {Euler} from "./GraphUtils/Euler";

export class GraphUtils {
    // static getWeightedAdjacencyMatrix(stationMap) {
    //     // initialize 2D array
    //     const weightedAdjacencyMatrix = new Array(stationMap.size).fill(0);
    //     for (let i = 0; i < weightedAdjacencyMatrix.length; i++) {
    //         weightedAdjacencyMatrix[i] = new Array(stationMap.size).fill(0);
    //     }
    //
    //     stationMap.forEach((station, key) => {
    //         station.edges.forEach(edge => {
    //             weightedAdjacencyMatrix[station.index][stationMap.get(edge.connectedStationId).index] = GraphUtils.distanceBetweenPoints(station, stationMap.get(edge.connectedStationId));
    //         });
    //     });
    //
    //     return weightedAdjacencyMatrix;
    // }

    static distanceBetweenPoints(point1, point2) {
        const x1 = point1.x;
        const x2 = point2.x;
        const y1 = point1.y;
        const y2 = point2.y;
        return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
    }

    static transposeGraph(stationMap) {

    }

    static getRandomValueFromArray(items) {
        if(items.length < 1) {
            return undefined;
        }
        const randomizedItem = items[this.getRandomValueBetweenNumbers(0, items.length)];
        return randomizedItem;
    }

    static getRandomValueBetweenNumbers(number1, number2) {
        return Math.floor((Math.random() * number2) + number1);
    }

    // https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point
    static getPointAlongLine(startingPoint, endingPoint, distanceToMove) {
        // distance between points
        const d = this.distanceBetweenPoints(startingPoint, endingPoint);
        const dt = distanceToMove;
        const x0 = startingPoint.x;
        const y0 = startingPoint.y;
        if(d <= 0) {
            return {x: x0, y: y0};
        }
        const x1 = endingPoint.x;
        const y1 = endingPoint.y;
        // distance ratio
        const t = dt/d;
        // new x on line
        const xt = x0 * (1 - t) + t * x1;
        // new y on line
        const yt = y0 * (1 - t) + t * y1;
        return {x: xt, y: yt};
}
}