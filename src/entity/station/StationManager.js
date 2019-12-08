import {Parser} from "../../core/Parser";
import {EntityManager} from "../EntityManager";
import {DepthFirstSearch} from "../../core/GraphUtils/DepthFirstSearch";
import {GraphUtils} from "../../core/GraphUtils";

export class StationManager extends EntityManager {

    constructor() {
        super();
        let stationMap = Parser.getNodes();
        this.mostConnectedStation = this._getStationWithMostConnections(stationMap);
        stationMap = this._removeDuplicateEdges(stationMap);
        this.mostConnectedStation = this._getStationWithMostConnections(stationMap);
        stationMap = this._removeUnconnectedStations(stationMap, this.mostConnectedStation);
        this.nodeSizes = this._getNodeSizeExtremes(stationMap);
        stationMap = this._scaleStations(stationMap, this.nodeSizes.smallestX, this.nodeSizes.smallestY);
        this.stationMap = stationMap;
        this.path = GraphUtils.getEulerianPath(this);
    }

    _removeDuplicateEdges(stationMap) {
        stationMap.forEach(station => {
           const edgeSet = new Set();
           const toRemove = new Set();
           station.edges.forEach(edge => {
              if(edgeSet.has(edge.connectedStationId)) {
                  toRemove.add(edge.connectedStationId);
              }
              edgeSet.add(edge.connectedStationId);
           });
           for(let i=station.edges.length - 1; i>=0; i--) {
               if(toRemove.has(station.edges[i].connectedStationId)) {
                   toRemove.delete(station.edges[i].connectedStationId);
                   station.edges.splice(i, 1);
               }
           }
        });

        return stationMap;
    }

    _getNodeSizeExtremes(stationMap) {
        let largestX = 0;
        let largestY = 0;
        let smallestX = Infinity;
        let smallestY = Infinity;
        stationMap.forEach(value => {
            largestX = value.x > largestX ? value.x : largestX;
            largestY = value.y > largestY ? value.y : largestY;

            smallestX = value.x < smallestX ? value.x : smallestX;
            smallestY = value.y < smallestY ? value.y : smallestY;
        });

        return {largestX: largestX, largestY: largestY, smallestX: smallestX, smallestY: smallestY};
    }

    _getStationWithMostConnections(stationMap) {
        let mostConnectedStation = undefined;
        let mostConnections = -1;
        stationMap.forEach(station => {
            const numberOfConnections = station.edges.length;
            if(numberOfConnections > mostConnections) {
                mostConnections = numberOfConnections;
                mostConnectedStation = station;
            }
        });
        return mostConnectedStation;
    }

    _removeUnconnectedStations(stationMap, stationToTest) {
        const nodesConnectedToStationSet = DepthFirstSearch.depthFirstSearch(stationMap, stationToTest);
        const nodesToBeRemoved = [];
        stationMap.forEach(station => {
           if(!nodesConnectedToStationSet.has(station.id)) {
               nodesToBeRemoved.push(station.id);
           }
        });
        nodesToBeRemoved.forEach(nodeToBeRemoved => {
            stationMap.delete(nodeToBeRemoved);
        });
        return stationMap;
    }

    _scaleStations(nStationMap, subtractX, subtractY) {
        const stationMap = nStationMap;
        stationMap.forEach((value, key) => {
            const readjustedValue = value;
            readjustedValue.x -= subtractX;
            readjustedValue.y -= subtractY;
            stationMap.set(key, readjustedValue);
        });
        return stationMap;
    }

    drawStations(canvas) {
        this.stationMap.forEach(station => {
            station.draw(canvas.ctx, station);
        });
    }

    resetData() {
        this.stationMap.forEach(station => {
            station.selected = false;
            station.peopleAtStation = [];
            station.trainsAtStation = [];
        });
    }

}