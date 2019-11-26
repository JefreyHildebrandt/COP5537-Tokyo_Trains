export class Edge {
    constructor(companyId, companyName, connectedNodeId, distance) {
        this.companyId = companyId;
        this.companyName = companyName;
        this.connectedNodeId = connectedNodeId;
        this.distance = distance;
    }
}