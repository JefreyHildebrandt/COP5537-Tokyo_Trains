import {EntityManager} from "../EntityManager";
import {Constants} from "../../core/Constants";
import {Train} from "./Train";
import {GraphUtils} from "../../core/GraphUtils";

export class TrainManager extends EntityManager {
    constructor(stationManager) {
        super();
        this.stationManager = stationManager;
        this.trains = this._createTrains();
    }

    _createTrains() {
        const trains = [];
        for(let id=0; id<Constants.NUMBER_OF_TRAINS; id++) {
            const direction = GraphUtils.getRandomValueFromArray(Object.values(Train.Direction));
            const timeToWait = GraphUtils.getRandomValueFromArray(Constants.TIME_TO_WAIT_TRAINS_RANDOMIZE);
            const skipNumberOfStations = GraphUtils.getRandomValueFromArray(Constants.NUMBER_OF_STOPS_FOR_TRAINS_RANDOMIZE);
            const startingPathIndex = GraphUtils.getRandomValueBetweenNumbers(0, this.stationManager.path.length);
            const startingState = GraphUtils.getRandomValueFromArray(Object.values(Train.State));
            const speed = GraphUtils.getRandomValueFromArray(Constants.TRAIN_SPEED_RANDOMIZE);
            const newTrain = new Train(this.stationManager, this.stationManager.path, direction, timeToWait, skipNumberOfStations, startingPathIndex, startingState, id, speed);
            trains.push(newTrain);
        }
        return trains;
    }

    handleTrainsUpdate() {
        this.trains.forEach(train => {
            train.timeIncrement();
        })
    }

    drawTrains(canvas) {
        this.trains.forEach(train => {
            train.draw(canvas.ctx);
        })
    }
}