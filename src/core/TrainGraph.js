import {AssetManager} from "./AssetManager";
import {StationManager} from "../entity/station/StationManager";
import {Canvas} from "./Canvas";
import {EdgeManager} from "../entity/edge/EdgeManager";
import {GraphUtils} from "./GraphUtils";
import {TrainManager} from "../entity/train/TrainManager";
import {PersonManager} from "../entity/person/PersonManager";
import {TimeManager} from "./TimeManager";
import {Mouse} from "./Mouse";
import {Euler} from "./GraphUtils/Euler";

export class TrainGraph {
    init() {
        this.stationManager = new StationManager();
        this.stationManager.path = Euler.getEulerianPath();
        const nodeSizes = this.stationManager.nodeSizes;
        const canvasWidth = nodeSizes.largestX - nodeSizes.smallestX;
        const canvasHeight = nodeSizes.largestY - nodeSizes.smallestY;
        this.canvas = new Canvas(canvasWidth, canvasHeight);
        this.mouse = new Mouse(this.canvas, this.stationManager);
        this.initializeChangingEntities();
    }

    initializeChangingEntities() {
        this.stationManager.resetData();
        this.timeManager = new TimeManager();
        this.trainManager = new TrainManager(this.stationManager);
        this.personManager = new PersonManager(this.stationManager, this.timeManager);
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
        this.personManager.drawPeople(this.canvas);
    }

    async load() {
        await AssetManager.loadAssets();
    }
}