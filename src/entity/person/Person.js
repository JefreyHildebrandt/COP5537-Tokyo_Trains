import {Entity} from "../Entity";

export class Person extends Entity {
    static State = {
        WAITING: 0,
        MOVING: 1,
    }

    constructor() {
        super();
        this.startingStation;
        this.endingStation;
        this.currentStation;
        this.state;
        this.timeToWaitAtAStation = 5;
        this.totalTime = 0;
    }

    handleTimeIncrement() {

    }

    takeWhichTrain() {

    }
}