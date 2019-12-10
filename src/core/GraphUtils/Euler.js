// adapted from https://www.geeksforgeeks.org/fleurys-algorithm-for-printing-eulerian-path/
import {StationManager} from "../../entity/station/StationManager";
import {DepthFirstSearch} from "./DepthFirstSearch";

export class Euler {
    static getEulerianPath() {
        let stationManager = new StationManager();
        this.checkCanEuler(stationManager.stationMap);
        const path = Euler.getEulerUtil(stationManager.stationMap, stationManager.mostConnectedStation, []);
        this.checkPathForAllNodes(stationManager.stationMap, path);
        return path;
    }

    static checkPathForAllNodes(stationMap, path) {
        const pathSet = new Set(path);
        if (pathSet.size === stationMap.size) {
            console.log('All stations are included in the path');
        } else {
            console.log('There are only ' + pathSet.size + ' stations in the path.');
        }
    }

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

    static removeEdge(stationMap, currentStation, edgeIndex) {
        return currentStation.edges.splice(edgeIndex, 1);
    }

    static addEdge(currentStation, edgeIndex, edgeToAdd) {
        currentStation.edges.splice(edgeIndex, 0, edgeToAdd);
    }

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