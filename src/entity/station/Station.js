import {Entity} from "../Entity";
import {AssetManager} from "../../core/AssetManager";

export class Station extends Entity {
    constructor(x, y, address, stationName, index, id) {
        super({x: x, y: y, id: id});
        this.index = index;
        this.address = address;
        this.stationName = stationName;
        this.selected = false;
        this.edges = [];
        this.peopleAtStation = [];
        this.trainsAtStation = [];
        this.extraTimePeopleSpentWaiting = 0;
    }

    addTrainToStation(train) {
        if(this._getIndexOfTrain(train) === -1) {
            this.trainsAtStation.push(train);
        }
    }

    removeTrainFromStation(train) {
        const trainIndex = this._getIndexOfTrain(train);
        if(trainIndex !== -1) {
            this.trainsAtStation.splice(trainIndex, 1);
        }
    }

    _getIndexOfTrain(train) {
        return this.trainsAtStation.findIndex(trainAtStation => trainAtStation.id === train.id);
    }

    addPersonToStation(person) {
        if(this._getIndexOfPerson(person) === -1) {
            this.peopleAtStation.push(person);
        }
    }

    removePersonFromStation(person) {
        const personIndex = this._getIndexOfPerson(person);
        if(personIndex !== -1) {
            this.peopleAtStation.splice(personIndex, 1);
        }
    }

    incrementExtraTimePeopleSpentWaiting() {
        this.extraTimePeopleSpentWaiting++;
    }

    _getIndexOfPerson(person) {
        return this.peopleAtStation.findIndex(personAtStation => personAtStation.id === person.id);
    }

    draw(ctx) {
        const x = this.x;
        const y = this.y;
        const pointSize = 6; // Change according to the size of the point.
        const numPeopleAtStation = this.peopleAtStation.length;
        this.drawPoint(ctx, 6, 'black');
        if(numPeopleAtStation > 0) {
            this.drawTextAbovePoint(ctx, this.peopleAtStation.length, x, y);
        }
    }

    drawTextAbovePoint(ctx, text, x, y) {
        ctx.save();
        const fontSize = 15;
        ctx.font = fontSize + "px Verdana";
        ctx.fillText(text, x, y + fontSize + 5);
        ctx.restore();
    }
}