export class GraphUtils {

    /**
     * Distance formula between two points
     * @param point1
     * @param point2
     * @returns {number}
     */
    static distanceBetweenPoints(point1, point2) {
        const x1 = point1.x;
        const x2 = point2.x;
        const y1 = point1.y;
        const y2 = point2.y;
        return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));
    }

    /**
     * takes an array and returns a random value inside of it
     * @param items
     * @returns {undefined|*}
     */
    static getRandomValueFromArray(items) {
        if(items.length < 1) {
            return undefined;
        }
        const randomizedItem = items[this.getRandomValueBetweenNumbers(0, items.length)];
        return randomizedItem;
    }

    /**
     * Random number between two numbers
     * @param number1
     * @param number2
     * @returns {number}
     */
    static getRandomValueBetweenNumbers(number1, number2) {
        return Math.floor((Math.random() * number2) + number1);
    }

    /**
     * Used to have trains follow on edges.  Finds a point along a line at a distance
     * @param startingPoint
     * @param endingPoint
     * @param distanceToMove
     * @returns {{x: *, y: *}}
     */
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