export class Dijkstra {
    static alreadyCalculated = new Map();

    static getDistanceOnPath(path, sourceId, targetId) {
        let smallestFromSource = Infinity;
        const startingIndex = path.indexOf(sourceId);
        for(let i=startingIndex; i<path.length; i++) {
            if(path[i] === targetId) {
                smallestFromSource = i - startingIndex;
                break;
            }
        }
        for(let i=startingIndex; i >= 0; i--) {
            if(path[i] === targetId && (i + startingIndex) < smallestFromSource) {
                smallestFromSource = i + startingIndex;
                break;
            }
        }
        return smallestFromSource;
    }

    static getDistanceBetweenTwoStations(stationMap, sourceId, targetId) {
        const key1 = sourceId + ',' + targetId;
        const key2 = targetId + ',' + sourceId;
        if(this.alreadyCalculated.has(key1)) {
            return this.alreadyCalculated.get(key1);
        }
        else if(this.alreadyCalculated.has(key2)) {
            return this.alreadyCalculated.get(key2);
        }
        return Dijkstra.getDistanceAndPathBetweenTwoStations(stationMap, sourceId, targetId).distance;
    }

    static getDistanceAndPathBetweenTwoStations(stationMap, sourceId, targetId) {
        const dist = new Map();
        dist.set(sourceId, 0);
        const sptSet = new Set();
        const parents = new Map();

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
                    parents.set(edge.connectedStationId, u);
                }
            })
        });
        dist.forEach((minimumDistance, stationId) => {
            const key1 = sourceId + ',' + stationId;
            const key2 = stationId + ',' + sourceId;
            this.alreadyCalculated.set(key1, minimumDistance);
            this.alreadyCalculated.set(key2, minimumDistance);
        });
        const path = this.getPathFromParents(parents, targetId, []);
        return {distance: dist.get(targetId), path: path};
    }

    static getPathFromParents(parent, id, path) {
        if(!parent.has(id)) {
            path.push(id);
            return path;
        }
        path = this.getPathFromParents(parent, parent.get(id), path);
        path.push(id);
        return path
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
}