// adapted from https://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/
import {StationManager} from "../../entity/station/StationManager";
import {DepthFirstSearch} from "./DepthFirstSearch";

export class Euler {
    static getEulerianPath(stationManager) {
        // make new map so the original does not get affected
        // let stationManager = new StationManager();
        let stationMap = stationManager.stationMap;
        this.checkCanEuler(stationManager.stationMap);
        // stationMap = Euler.eulerizeStationMap(stationMap);
        const path = Euler.getEulerUtil(stationMap, stationManager.mostConnectedStation, []);
        this.checkPathForAllNodes(stationMap, path);
        return path;
    }

    static checkPathForAllNodes(stationMap, path) {
        const pathSet = new Set(path);
        if(pathSet.size === stationMap.size) {
            console.log('All stations are included in the path');
        }
        else {
            console.log('There are only ' + pathSet.size + ' stations in the path.');
        }
        // const increasingArray = []
        // path.forEach(stationId => {
        //     increasingArray.push('hey');
        //    stationMap.get(stationId).peopleAtStation = increasingArray.slice();
        // });
    }

    static checkCanEuler(stationMap) {
        // number of in degree must equal number of out degree for each node
        let inDegreeCount = new Map();
        stationMap.forEach(station => {
           station.edges.forEach(edge => {
               if(!inDegreeCount.has(edge.connectedStationId)) {
                   inDegreeCount.set(edge.connectedStationId, 0);
               }
               inDegreeCount.set(edge.connectedStationId, inDegreeCount.get(edge.connectedStationId) + 1);
           });
        });
        stationMap.forEach(station => {
           const outDegree = station.edges.length;
           const inDegree = inDegreeCount.get(station.id);
           if(outDegree !== inDegree) {
               console.error('In-degree does not match out-degree cannot get euler path!');
           }
        });
        console.log('In-degree matches out-degree. Good to go!');
    }

    static getEulerUtil(stationMap, currentStation, path) {
        for(let i=0; i<currentStation.edges.length; i++) {
            if(this.isValidNextEdge(stationMap, currentStation, i)) {
                if(!currentStation.edges[i]) {
                    console.log('her');
                }
                const nextStation = stationMap.get(currentStation.edges[i].connectedStationId);
                path.push(currentStation.id);
                this.removeEdge(stationMap, currentStation, i);
                this.getEulerUtil(stationMap, nextStation, path);
            }
        }
        // for(let i=currentStation.edges.length-1; i>=0; i--) {
        //     if(this.isValidNextEdge(stationMap, currentStation, i)) {
        //         if(!currentStation.edges[i]) {
        //             console.log('her');
        //         }
        //         const nextStation = stationMap.get(currentStation.edges[i].connectedStationId);
        //         path.push(currentStation.id);
        //         this.removeEdge(stationMap, currentStation, i);
        //         this.getEulerUtil(stationMap, nextStation, path);
        //     }
        // }
        // currentStation.edges.forEach((edge, edgeIndex) => {
        //     if(this.isValidNextEdge(stationMap, currentStation, edgeIndex)) {
        //         const nextStation = stationMap.get(currentStation.edges[edgeIndex].connectedStationId);
        //         path.push(currentStation.id);
        //         this.removeEdge(stationMap, currentStation, edgeIndex);
        //         this.getEulerUtil(stationMap, nextStation, path);
        //     }
        // });
        return path;
    }

    static isValidNextEdge(stationMap, currentStation, nextEdgeIndex) {
        // return false;
        if(currentStation.edges.length === 1) {
            return true;
        }
        const count1 = DepthFirstSearch.depthFirstSearch(stationMap, currentStation).size;
        const removedEdge = this.removeEdge(stationMap, currentStation, nextEdgeIndex)[0];
        const count2 = DepthFirstSearch.depthFirstSearch(stationMap, currentStation).size;
        this.addEdge(currentStation, nextEdgeIndex, removedEdge);
        return count1 <= count2;
    }

    static removeEdge(stationMap, currentStation, edgeIndex) {
        return currentStation.edges.splice(edgeIndex, 1);
    }

    static addEdge(currentStation, edgeIndex, edgeToAdd) {
        currentStation.edges.splice(edgeIndex, 0, edgeToAdd);
    }

    static eulerizeStationMap(stationMap) {
        const allOddStationIds = [];
        stationMap.forEach(station => {
            if(station.edges.length %2 !== 0) {
                allOddStationIds.push(station.id);
            }
        });
        allOddStationIds.forEach(oddId => {
            const stationEdges = stationMap.get(oddId).edges;
            stationEdges.push(stationEdges[0]);
        });

        return stationMap;
    }

    // static getSmallestArrayPair(array) {
    //     const pairSet = new Set();
    //     array.forEach(value1 => {
    //         array.forEach(value2 => {
    //             if(value1 !== value2) {
    //                 const combo1 = value1 + ',' + value2;
    //                 const combo2 = value2 + ',' + value1;
    //                 // const combo1 = {id1: value1, id2:value2};
    //                 // const combo2 = {id1:value2, id2:value1};
    //                 if(!pairSet.has(combo1) && !pairSet.has(combo2)) {
    //                     pairSet.add(combo1);
    //                 }
    //             }
    //         })
    //     });
    //
    //     const allPairs = Array.from(pairSet).sort();
    //     console.log(allPairs);
    //
    //     const checkAndAddValuesToSetAndArray = (allUsedIds, combinationArray, pair) => {
    //       const splitPair = pair.split(',');
    //       if(!allUsedIds.has(splitPair[0]) && !allUsedIds.has(splitPair[1])) {
    //           allUsedIds.add(splitPair[0]);
    //           allUsedIds.add(splitPair[1]);
    //           combinationArray.push(pair);
    //       }
    //     };
    //
    //     let separateArrays = [];
    //     let differentStartingId = [];
    //     let currentStart = undefined;
    //     for(let i=0; i<allPairs.length; i++) {
    //         let start = allPairs[i].split(',')[0];
    //         if(currentStart === undefined) {
    //             currentStart = start;
    //         }
    //         if(start === currentStart) {
    //             differentStartingId.push(allPairs[i]);
    //         }
    //         else {
    //             separateArrays.push(differentStartingId);
    //             currentStart = start;
    //             differentStartingId = [allPairs[i]];
    //         }
    //     }
    //     separateArrays.push(differentStartingId);
    //
    //     for(let i=0; i<separateArrays[0].length; i++) {
    //         const allUsedIds = new Set();
    //         const combinationArray = [];
    //         checkAndAddValuesToSetAndArray(allUsedIds, combinationArray, separateArrays[0][i]);
    //         for(let j=1; j<separateArrays.length; j++) {
    //             for(let k=0; k<separateArrays[j].length; k++) {
    //                 checkAndAddValuesToSetAndArray(allUsedIds, combinationArray, separateArrays[j][k]);
    //             }
    //         }
    //         console.log(combinationArray);
    //     }
    //
    //     // for(let i=0; i<allPairs.length; i++) {
    //     //     const allUsedIds = new Set();
    //     //     const combinationArray = [];
    //     //     checkAndAddValuesToSetAndArray(allUsedIds, combinationArray, allPairs[i]);
    //     //     for(let j=0; j<allPairs.length; j++) {
    //     //         checkAndAddValuesToSetAndArray(allUsedIds, combinationArray, allPairs[j]);
    //     //     }
    //     //     console.log(combinationArray);
    //     // }
    //     // console.log();
    // }

    // static pairsWithShortestTotalDistance(allArrayPairs) {
    //     return allArrayPairs[0];
    // }
    //
    // static addEdgesFromEdgePairsToMap(stationMap, shortestPairs) {
    //     return stationMap;
    // }
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
//             return GraphUtils.getPath(stationMap, parent, s); // should return the print path function from the link
//         }
//
//         s.edges.forEach(edge => {
//            if(!visited.has(edge.connectedStationId)) {
//                queue.push(stationMap.get(edge.connectedStationId));
//                visited.add(edge.connectedStationId);
//                parent.set(edge.connectedStationId, s);
//            }
//         });
//     }
//
// }