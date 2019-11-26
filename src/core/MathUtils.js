export class MathUtils {
    // static getWeightedAdjacencyMatrix(stationMap) {
    //     // initialize 2D array
    //     const weightedAdjacencyMatrix = new Array(stationMap.size).fill(0);
    //     for (let i = 0; i < weightedAdjacencyMatrix.length; i++) {
    //         weightedAdjacencyMatrix[i] = new Array(stationMap.size).fill(0);
    //     }
    //
    //     stationMap.forEach((station, key) => {
    //         station.edges.forEach(edge => {
    //             weightedAdjacencyMatrix[station.index][stationMap.get(edge.connectedNodeId).index] = MathUtils.distanceBetweenPoints(station, stationMap.get(edge.connectedNodeId));
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

    // static getPath(stationMap, parent, j) {
    //     let pathLength = 1;
    //     if(!parent.has(j.id) && )
    // }
    //
    // // adapted from https://www.geeksforgeeks.org/shortest-path-weighted-graph-weight-edge-1-2/
    // static findShortestPath(stationMap, startingStation, destinationStation) {
    //     const visited = new Set();
    //     const parent = new Map();
    //     const queue = [];
    //     queue.push(startingStation);
    //     while(queue.length > 0) {
    //         const s = queue.shift();
    //         if(s.id === destinationStation.id) {
    //             return MathUtils.getPath(stationMap, parent, s); // should return the print path function from the link
    //         }
    //
    //         s.edges.forEach(edge => {
    //            if(!visited.has(edge.connectedNodeId)) {
    //                queue.push(stationMap.get(edge.connectedNodeId));
    //                visited.add(edge.connectedNodeId);
    //                parent.set(edge.connectedNodeId, s);
    //            }
    //         });
    //     }
    //
    // }
}