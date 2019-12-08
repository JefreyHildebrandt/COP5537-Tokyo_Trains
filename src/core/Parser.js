import * as tokyoTrains from '../../assets/tokyoTrains';
import {Station} from "../entity/station/Station";
import {Edge} from "../entity/edge/Edge";
import {GraphUtils} from "./GraphUtils";

export class Parser {
    static getNodes() {
        const nodeList = tokyoTrains.elements.nodes;
        let nodeMaps = this.convertNodeListToMap(nodeList);
        const nodeMap = Parser.attachEdgesToNodes(nodeMaps.nodeMap, nodeMaps.nodeIdToStationIdConversionMap);
        return nodeMap;
    }

    static convertNodeListToMap(nodeList) {
        const nodeMap = new Map();
        const nodeIdToStationIdConversionMap = new Map();
        let i = 0;
        nodeList.forEach(node => {
            const x = Math.abs(node.position.x);
            const y = Math.abs(node.position.y);
            const index = i;
            const id = node.data.station_g_cd;
            const nodeId = node.data.id;
            const address = node.data.add;
            const stationName = node.data.station_name;
            nodeIdToStationIdConversionMap.set(nodeId, id);
            if(!nodeMap.has(id)) {
                // console.error('There should not be multiple of the same id.  id:' + id);
                nodeMap.set(id, new Station(x, y, address, stationName, index, id))
            }

            i++;
        });
        return {nodeMap: nodeMap, nodeIdToStationIdConversionMap: nodeIdToStationIdConversionMap};
    }

    static attachEdgesToNodes(nodeMap, nodeIdToStationIdConversionMap) {
        const edgeList = tokyoTrains.elements.edges;
        edgeList.forEach(edge => {
            const companyId = edge.data.company_type;
            const companyName = edge.data.company_name;
            const connectedNodeIdSource = edge.data.source;
            const connectedNodeIdTarget = edge.data.target;
            const connectedStationIdSource = nodeIdToStationIdConversionMap.get(connectedNodeIdSource);
            const connectedStationIdTarget = nodeIdToStationIdConversionMap.get(connectedNodeIdTarget);
            const distance = GraphUtils.distanceBetweenPoints(nodeMap.get(connectedStationIdSource), nodeMap.get(connectedStationIdTarget));
            nodeMap.get(connectedStationIdSource).edges.push(new Edge(companyId, companyName, connectedStationIdTarget, distance));
            nodeMap.get(connectedStationIdTarget).edges.push(new Edge(companyId, companyName, connectedStationIdSource, distance));
        });
        return nodeMap;
    }
}