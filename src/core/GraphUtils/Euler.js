// adapted from https://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/
import {StationManager} from "../../entity/station/StationManager";
import {DepthFirstSearch} from "./DepthFirstSearch";

export class Euler {
    /**
     * Obtains the euler path, which touches all edges
     * @returns {*}
     */
    static getEulerianPath() {
        let stationManager = new StationManager();
        this.checkCanEuler(stationManager.stationMap);
        const path = Euler.getEulerUtil(stationManager.stationMap, stationManager.mostConnectedStation, []);
        this.checkPathForAllNodes(stationManager.stationMap, path);
        return path;
    }

    /**
     * Sanity check which sees how many nodes are in the path
     * @param stationMap
     * @param path
     */
    static checkPathForAllNodes(stationMap, path) {
        const pathSet = new Set(path);
        if (pathSet.size === stationMap.size) {
            console.log('All stations are included in the path');
        } else {
            console.log('There are only ' + pathSet.size + ' stations in the path.');
        }
    }

    /**
     * Checks the in-degree and out-degree of all the nodes in the map
     * @param stationMap
     */
    static checkCanEuler(stationMap) {
        // number of in degree must equal number of out degree for each node
        let inDegreeCount = new Map();
        stationMap.forEach(station => {
            station.edges.forEach(edge => {
                if (!inDegreeCount.has(edge.connectedStationId)) {
                    inDegreeCount.set(edge.connectedStationId, 0);
                }
                inDegreeCount.set(edge.connectedStationId, inDegreeCount.get(edge.connectedStationId) + 1);
            });
        });
        stationMap.forEach(station => {
            const outDegree = station.edges.length;
            const inDegree = inDegreeCount.get(station.id);
            if (outDegree !== inDegree) {
                console.error('In-degree does not match out-degree cannot get euler path!');
            }
        });
        console.log('In-degree matches out-degree. Good to go!');
    }

    /**
     * A helper function for the euler path
     * @param stationMap
     * @param currentStation
     * @param path
     * @returns {*}
     */
    static getEulerUtil(stationMap, currentStation, path) {
        for (let i = 0; i < currentStation.edges.length; i++) {
            if (this.isValidNextEdge(stationMap, currentStation, i)) {
                if (!currentStation.edges[i]) {
                    console.log('her');
                }
                const nextStation = stationMap.get(currentStation.edges[i].connectedStationId);
                path.push(currentStation.id);
                this.removeEdge(stationMap, currentStation, i);
                this.getEulerUtil(stationMap, nextStation, path);
            }
        }

        return path;
    }

    /**
     * Checks whether the next edge is a bridge
     * @param stationMap
     * @param currentStation
     * @param nextEdgeIndex
     * @returns {boolean}
     */
    static isValidNextEdge(stationMap, currentStation, nextEdgeIndex) {
        if (currentStation.edges.length === 1) {
            return true;
        }
        const count1 = DepthFirstSearch.depthFirstSearch(stationMap, currentStation).size;
        const removedEdge = this.removeEdge(stationMap, currentStation, nextEdgeIndex)[0];
        const count2 = DepthFirstSearch.depthFirstSearch(stationMap, currentStation).size;
        this.addEdge(currentStation, nextEdgeIndex, removedEdge);
        return count1 <= count2;
    }

    /**
     * Removes an edge from the list
     * @param stationMap
     * @param currentStation
     * @param edgeIndex
     * @returns {*[]}
     */
    static removeEdge(stationMap, currentStation, edgeIndex) {
        return currentStation.edges.splice(edgeIndex, 1);
    }

    /**
     * adds a new edge to the list
     * @param currentStation
     * @param edgeIndex
     * @param edgeToAdd
     */
    static addEdge(currentStation, edgeIndex, edgeToAdd) {
        currentStation.edges.splice(edgeIndex, 0, edgeToAdd);
    }

    /**
     * Finds any nodes with odd degrees and adds a link
     * @param stationMap
     * @returns {*}
     */
    static eulerizeStationMap(stationMap) {
        const allOddStationIds = [];
        stationMap.forEach(station => {
            if (station.edges.length % 2 !== 0) {
                allOddStationIds.push(station.id);
            }
        });
        allOddStationIds.forEach(oddId => {
            const stationEdges = stationMap.get(oddId).edges;
            stationEdges.push(stationEdges[0]);
        });

        return stationMap;
    }
}