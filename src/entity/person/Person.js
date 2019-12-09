import {Entity} from "../Entity";
import {Dijkstra} from "../../core/GraphUtils/Dijkstra";
import {Train} from "../train/Train";

export class Person extends Entity {
    static State = {
        WAITING: 0,
        ON_TRAIN: 1,
        DOES_NOT_EXIST: 2,
        ARRIVED: 3
    }

    constructor(id, stationManager, timeManager, startingStation, endingStation, timeToBeginWaitingAtStartingStation) {
        super({id: id});
        this.stationManager = stationManager;
        this.timeManager = timeManager;
        this.startingStation = startingStation;
        this.endingStation = endingStation;
        this.currentStation = startingStation;
        this.state = Person.State.DOES_NOT_EXIST;
        this.totalTimeToDestination = 0;
        this.timeToBeginWaitingAtStartingStation = timeToBeginWaitingAtStartingStation;
        this.x = this.startingStation.x;
        this.y = this.startingStation.y;
        this.currentTrain = undefined;
    }

    timeIncrement() {
        if(this.state !== Person.State.ARRIVED && this._hasMadeItToDestination()) {
            this.console.log('HAS ARRIVED! ID: ' + this.id);
            this.state = Person.State.ARRIVED;
        }
        if(this.state === Person.State.ARRIVED) {
            return;
        }
        const hasStartedWaiting = this._hasStartedWaiting();
        if(this.state === Person.State.DOES_NOT_EXIST && hasStartedWaiting) {
            this.state = Person.State.WAITING;
            this.currentStation.addPersonToStation(this);
        }
        else if(!hasStartedWaiting){
            return;
        }

        this.totalTimeToDestination++;

        this._onTrain();
        if(this.state === Person.State.WAITING) {
            this.currentStation.incrementExtraTimePeopleSpentWaiting();
            this.currentTrain = this._takeWhichTrain();
        }
        else if(this.state === Person.State.ON_TRAIN
            && this.currentTrain
            && this.currentTrain.state === Train.State.WAITING) {
            this.currentTrain = this._takeWhichTrain();
        }
        // this._onTrain();
    }

    _onTrain() {
        if(this.currentTrain) {
            this.x = this.currentTrain.x;
            this.y = this.currentTrain.y;
            this.state = Person.State.ON_TRAIN;
            if(this.currentTrain.state === Train.State.WAITING) {
                this.currentStation.removePersonFromStation(this);
                this.currentStation = this.currentTrain.getCurrentStation();
                this.currentStation.addPersonToStation(this);
            }
        }
        else {
            this.state = Person.State.WAITING;
            this.x = this.currentStation.x;
            this.y = this.currentStation.y;
        }
    }

    _takeWhichTrain() {
        if(!this.currentTrain && this.currentStation.trainsAtStation.length < 1) {
            return undefined;
        }

        const distanceFromCurrentStationToDestination =
            Dijkstra.getDistanceBetweenTwoStations(
                this.stationManager.stationMap,
                this.currentStation.id,
                this.endingStation.id);
        let smallestDistance = distanceFromCurrentStationToDestination;
        let bestTrain = undefined;
        this.currentStation.trainsAtStation.forEach(train => {
            const distanceFromTrainNextStationToDestination =
                Dijkstra.getDistanceBetweenTwoStations(
                    this.stationManager.stationMap,
                    this.currentStation.id,
                    train.getNextStationInfo().nextStation.id);
            if(distanceFromTrainNextStationToDestination < smallestDistance) {
                smallestDistance = distanceFromTrainNextStationToDestination;
                bestTrain = train;
            }
        });

        return bestTrain;
    }

    _hasStartedWaiting() {
        return this.timeManager.timeElapsed > this.timeToBeginWaitingAtStartingStation;
    }

    _hasMadeItToDestination() {
        return this.currentStation.id === this.endingStation.id;
    }

    draw(ctx) {
        if(!this._hasStartedWaiting()) {
            return;
        }
        this.drawPoint(ctx, 3, 'orange');
    }
}