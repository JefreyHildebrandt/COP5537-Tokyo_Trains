export class Edge {
    constructor(companyId, companyName, connectedStationId, distance) {
        this.companyId = companyId;
        this.connectedStationId = connectedStationId;
        this.distance = distance;
    }
}