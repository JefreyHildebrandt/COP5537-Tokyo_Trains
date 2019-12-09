export class DepthFirstSearch {
    static depthFirstSearch(stationMap, stationToTest) {
        return this.depthFirstSearchPath(stationMap, stationToTest).visited;
    }

    static depthFirstSearchPath(stationMap, stationToTest) {
        const visited = new Set();
        const path = [];
        stationToTest.edges.forEach(edge => {
            if(!visited.has(edge.connectedStationId)) {
                this.depthFirstSearchUtil(stationMap, edge, visited, path);
            }
        });
        return {visited: visited, path: path};
    }

    // adapted from https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/
    static depthFirstSearchUtil(stationMap, edge, visited) {
        visited.add(edge.connectedStationId);
        stationMap.get(edge.connectedStationId).edges.forEach(checkEdge => {
            // path.push(checkEdge.connectedStationId);
            if(!visited.has(checkEdge.connectedStationId)) {
                this.depthFirstSearchUtil(stationMap, checkEdge, visited)
            }
        });
    }

    static depthFirstSearchCount(stationMap, currentStation, visited) {
        if(visited === undefined) {
            visited = new Set();
        }
        let count = 1;
        visited.add(currentStation.id);

        currentStation.edges.forEach(edge => {
            if(!visited.has(edge.connectedStationId)) {
                count = count + this.depthFirstSearchCount(stationMap, stationMap.get(edge.connectedStationId), visited);
            }
        });
        return count;
    }
}