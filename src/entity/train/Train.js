import {Entity} from "../Entity";
import {AssetManager} from "../../core/AssetManager";
import {GraphUtils} from "../../core/GraphUtils";
import {Constants} from "../../core/Constants";

export class Train extends Entity {

    static Direction = {
      BACKWARD: 0,
      FORWARD: 1,
    };

    static State = {
      MOVING:  0,
      WAITING: 1
    };

    constructor(stationManager, path, direction, timeToWaitAtAStation, skipNumberOfStations, startingPathIndex, startingState, id, speed) {
        super({id: id});
        this.image = AssetManager.train;
        this.stationManager = stationManager;
        this.path = path;
        this.direction = direction || Train.Direction.FORWARD;
        this.timeToWaitAtAStation = timeToWaitAtAStation;
        this.timeLeftToWait = timeToWaitAtAStation;
        this.skipNumberOfStations = skipNumberOfStations;
        this.skippedStations = skipNumberOfStations || 3;
        this.atPathIndex = startingPathIndex || 0;
        this.state = startingState || Train.State.WAITING;
        this.x = this.getCurrentStation().x;
        this.y = this.getCurrentStation().y;
        this.speed = speed;
    }

    timeIncrement() {
        switch(this.state) {
            case Train.State.WAITING:
                this.timeLeftToWait--;
                if(this.timeLeftToWait < 1) {
                    this.state = Train.State.MOVING;
                    this.timeLeftToWait = this.timeToWaitAtAStation;
                }
                break;
            case Train.State.MOVING:
                const newPoint = this._moveTowardsNextStation();
                this.x = newPoint.x;
                this.y = newPoint.y;
                if(this._isAtNextStation()) {
                    this.skippedStations -= 1;
                    const previousStation = this.getCurrentStation();
                    const currentStationInfo = this.getNextStationInfo(1);
                    previousStation.removeTrainFromStation(this);
                    currentStationInfo.nextStation.addTrainToStation(this);
                    this.atPathIndex = currentStationInfo.pathIndex;
                    this.x = currentStationInfo.nextStation.x;
                    this.y = currentStationInfo.nextStation.y;
                    this.direction = currentStationInfo.direction;
                    if(this.skippedStations < 1) {
                        this.state = Train.State.WAITING;
                        this.skippedStations = this.skipNumberOfStations;
                    }
                }
                break;
        }
    }

    _moveTowardsNextStation() {
        const nextStationOnPath = this.getNextStationInfo(1).nextStation;
        const distanceToMove = this.speed;
        return GraphUtils.getPointAlongLine(this, nextStationOnPath, distanceToMove);
    }

    _isAtNextStation() {
        const nextStationOnPath = this.getNextStationInfo(1).nextStation;
        const distanceFromNextStation = GraphUtils.distanceBetweenPoints(this, nextStationOnPath);
        if(distanceFromNextStation <= this.speed) {
            return true;
        }
        return false;
    }

    getCurrentStation() {
        return this.stationManager.stationMap.get(this.path[this.atPathIndex])
    }

    getNextStationInfo(numberOfStationsAway) {
        numberOfStationsAway = numberOfStationsAway || this.skippedStations;
        let direction = this.direction;
        let nextIndex = this.atPathIndex;
        if(direction === Train.Direction.FORWARD) {
            nextIndex += numberOfStationsAway;
            if(nextIndex >= this.path.length - 1) {
                this.direction = Train.Direction.BACKWARD;
                nextIndex -= (this.path.length - 1) - nextIndex;
            }
        }
        else if(direction === Train.Direction.BACKWARD) {
            nextIndex -= numberOfStationsAway;
            if(nextIndex <= 0) {
                this.direction = Train.Direction.FORWARD;
                nextIndex += 0 - nextIndex;
            }
        }
        else {
            console.error('The direction is not a valid enum');
        }
        // let nextIndex = Train.Direction.FORWARD ? this.atPathIndex + 1 : this.atPathIndex - 1;
        const nextStation = this.stationManager.stationMap.get(this.path[nextIndex])
        return {nextStation: nextStation, pathIndex: nextIndex, direction: direction};
    }

    draw(ctx) {
        ctx.save();
        const height = 25;
        const width = 25;
        const topLeftX = this.x - width/2;
        const topLeftY = this.y - height/2;
        ctx.rect(topLeftX, topLeftY, width, height);
        ctx.stroke();
        ctx.restore();
    }
}