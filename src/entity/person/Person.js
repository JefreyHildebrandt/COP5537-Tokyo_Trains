import {Entity} from "../Entity";

export class Person extends Entity {
    static State = {
        WAITING: 0,
        ON_TRAIN: 1,
    }

    constructor(stationManager) {
        super();
        this.startingStation;
        this.endingStation;
        this.currentStation;
        this.state = Person.State.WAITING;
        this.timeToWaitAtAStation = 5;
        this.totalTime = 0;
    }

    handleTimeIncrement() {

    }

    takeWhichTrain() {

    }

    draw(ctx) {

    }
}