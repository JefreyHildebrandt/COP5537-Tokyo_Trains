export class Dijkstra {
    static alreadyCalculated = new Map();

    static getDistanceBetweenTwoStations(stationMap, sourceId, targetId) {
        const key1 = sourceId + ',' + targetId;
        const key2 = targetId + ',' + sourceId;
        if(this.alreadyCalculated.has(key1)) {
            return this.alreadyCalculated.get(key1);
        }
        else if(this.alreadyCalculated.has(key2)) {
            return this.alreadyCalculated.get(key2);
        }
        const dist = new Map();
        dist.set(sourceId, 0);
        const sptSet = new Set();

        stationMap.forEach(station => {
            const u = this.minDistance(dist, sptSet);
            sptSet.add(u);
           station.edges.forEach(edge => {
                const distToEdge = edge.distance;
                const edgeSavedDistance = dist.has(edge.connectedStationId) ? dist.get(edge.connectedStationId) : Infinity;
                const newDistance = dist.get(u) + distToEdge;
                if(!sptSet.has(edge.connectedStationId) &&
                    edgeSavedDistance > newDistance) {
                    dist.set(edge.connectedStationId, newDistance);
                }
           })
        });
        dist.forEach((minimumDistance, stationId) => {
            const key1 = sourceId + ',' + stationId;
            const key2 = stationId + ',' + sourceId;
            this.alreadyCalculated.set(key1, minimumDistance);
            this.alreadyCalculated.set(key2, minimumDistance);
        });
        return dist.get(targetId);
    }

    static minDistance(dist, sptSet) {
        let min = Infinity;
        let minId = undefined;
        dist.forEach((value, key) => {
            if(value < min && !sptSet.has(minId)) {
                min = value;
                minId = key;
            }
        });

        return minId;
    }

    static getPathBetweenTwoStations(stationMap, id1, id2) {
        return [];
    }
}