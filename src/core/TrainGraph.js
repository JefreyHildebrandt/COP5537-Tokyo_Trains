import {AssetManager} from "./AssetManager";
import {StationManager} from "../entity/station/StationManager";
import {Canvas} from "./Canvas";
import {EdgeManager} from "../entity/edge/EdgeManager";
import {GraphUtils} from "./GraphUtils";
import {TrainManager} from "../entity/train/TrainManager";
import {PersonManager} from "../entity/person/PersonManager";
import {TimeManager} from "./TimeManager";

export class TrainGraph {
    init() {
        this.stationManager = new StationManager();
        const nodeSizes = this.stationManager.nodeSizes;
        const canvasWidth = nodeSizes.largestX - nodeSizes.smallestX;
        const canvasHeight = nodeSizes.largestY - nodeSizes.smallestY;
        this.canvas = new Canvas(canvasWidth, canvasHeight);
        this.initializeChangingEntities();
    }

    initializeChangingEntities() {
        this.stationManager.resetData();
        this.trainManager = new TrainManager(this.stationManager);
        this.personManager = new PersonManager(this.trainManager, this.stationManager);
        this.timeManager = new TimeManager();
    }

    run() {
        this.canvas.clearCanvas()
        this.updateData();
        this.drawAll();

        window.requestAnimationFrame(() => {
            this.run();
        });
    }

    updateData() {
        this.timeManager.incrementTime();
        this.trainManager.handleTrainsUpdate();
        this.personManager.handlePeopleUpdate();
    }

    drawAll() {
        EdgeManager.drawEdges(this.canvas, this.stationManager.stationMap);
        this.trainManager.drawTrains(this.canvas);
        this.stationManager.drawStations(this.canvas);
    }

    async load() {
        await AssetManager.loadAssets();
    }
}