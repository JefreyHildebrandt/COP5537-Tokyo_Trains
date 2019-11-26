import {Entity} from "../Entity";
import {AssetManager} from "../../core/AssetManager";

export class Train extends Entity {

    static Direction = {
      BACKWARD: 0,
      FORWARD: 1,
    };

    static State = {
      MOVING:  0,
      WAITING: 1
    };

    constructor() {
        super();
        this.image = AssetManager.train;
        this.path;
        this.direction = Train.Direction.FORWARD;
        this.timeToWaitAtAStation = 5;
        this.skipStations = 3;
        this.atStop = 0;
    }

    timeIncrement() {

    }

    getNextStation() {

    }
}