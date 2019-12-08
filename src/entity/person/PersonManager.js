import {EntityManager} from "../EntityManager";

export class PersonManager extends EntityManager {
    constructor(trainManager, stationManager) {
        super();
        this.trainManager = trainManager;
        this.stationManager = stationManager;
        this.people = this._createPeople();
    }

    _createPeople() {
        return [];
    }

    handlePeopleUpdate() {

    }

    drawPeople(canvas) {
        this.people.forEach(person => {
            person.draw(canvas.ctx);
        })
    }

}