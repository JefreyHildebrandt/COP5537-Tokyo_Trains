export class EdgeManager {
    static CompanyColor = {
        0: 'red',
        1: 'blue',
        2: 'green'
    }

    static drawEdges(canvas, stationMap) {
        const ctx = canvas.ctx;
        stationMap.forEach((station, key) => {
            station.edges.forEach(edge => {
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(station.x, station.y);
                const connectedNode = stationMap.get(edge.connectedStationId);
                ctx.lineTo(connectedNode.x, connectedNode.y);
                ctx.strokeStyle = EdgeManager.CompanyColor[edge.companyId];
                ctx.stroke();
                ctx.restore();
            });
        });
    }
}