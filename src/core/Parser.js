import * as tokyoTrains from '../../assets/tokyoTrains';
import {Station} from "../entity/station/Station";
import {Edge} from "../entity/edge/Edge";
import {MathUtils} from "./MathUtils";

export class Parser {
    static getNodes() {
        const nodeList = tokyoTrains.elements.nodes;
        let nodeMap = this.convertNodeListToMap(nodeList)
        nodeMap = Parser.attachEdgesToNodes(nodeMap);
        return nodeMap;
    }

    static convertNodeListToMap(nodeList) {
        const nodeMap = new Map();
        let i = 0;
        nodeList.forEach(node => {
            const x = Math.abs(node.position.x);
            const y = Math.abs(node.position.y);
            const index = i;
            const id = node.data.id;
            const address = node.data.add;
            const stationName = node.data.station_name;
            if(nodeMap.has(id)) {
                console.error('There should not be multiple of the same id.  id:' + id);
            }
            nodeMap.set(id, new Station(x, y, address, stationName, index, id))
            i++;
        });
        return nodeMap;
    }

    static attachEdgesToNodes(nodeMap) {
        const edgeList = tokyoTrains.elements.edges;
        edgeList.forEach(edge => {
            const companyId = edge.data.company_type;
            const companyName = edge.data.company_name;
            const connectedNodeIdSource = edge.data.source;
            const connectedNodeIdTarget = edge.data.target;
            const distance = MathUtils.distanceBetweenPoints(nodeMap.get(connectedNodeIdSource), nodeMap.get(connectedNodeIdTarget));
            nodeMap.get(connectedNodeIdSource).edges.push(new Edge(companyId, companyName, connectedNodeIdTarget, distance));
            nodeMap.get(connectedNodeIdTarget).edges.push(new Edge(companyId, companyName, connectedNodeIdSource, distance));
        });
        return nodeMap;
    }
}