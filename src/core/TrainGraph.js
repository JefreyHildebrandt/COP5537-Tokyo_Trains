import {AssetManager} from "./AssetManager";
import {StationManager} from "../entity/station/StationManager";
import {Canvas} from "./Canvas";
import {EdgeManager} from "../entity/edge/EdgeManager";
import {MathUtils} from "./MathUtils";

export class TrainGraph {
    init() {
        this.stationManager = new StationManager();
        const nodeSizes = this.stationManager.getNodeSizeExtremes();
        this.stationManager.scaleStations(nodeSizes.smallestX, nodeSizes.smallestY);
        const canvasWidth = nodeSizes.largestX - nodeSizes.smallestX;
        const canvasHeight = nodeSizes.largestY - nodeSizes.smallestY;
        this.canvas = new Canvas(canvasWidth, canvasHeight);
        // this.weightedAdjacencyMatrix = MathUtils.getWeightedAdjacencyMatrix(this.stationManager.stationMap);
        // console.log(this.weightedAdjacencyMatrix);
    }

    run() {
        this.canvas.clearCanvas()
        EdgeManager.drawEdges(this.canvas, this.stationManager.stationMap);
        this.stationManager.drawStations(this.canvas);

        window.requestAnimationFrame(() => {
            this.run();
        });
    }

    async load() {
        await AssetManager.loadAssets();
    }
}