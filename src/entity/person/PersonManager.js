import {EntityManager} from "../EntityManager";
import {Constants} from "../../core/Constants";
import {Person} from "./Person";
import {GraphUtils} from "../../core/GraphUtils";

export class PersonManager extends EntityManager {
    constructor(stationManager, timeManager) {
        super();
        this.stationManager = stationManager;
        this.timeManager = timeManager;
        this.people = this._createPeople();
    }

    /**
     * Creates people with random values
     * @returns {[]}
     * @private
     */
    _createPeople() {
        const people = [];
        for(let id=0; id<Constants.NUMBER_OF_PEOPLE; id++) {
            if(this.stationManager.path.length < 2) {
                console.error('path is too small to create people');
                return people;
            }

            let startingStationIndex = GraphUtils.getRandomValueBetweenNumbers(0, this.stationManager.path.length);
            let travelFromStart = GraphUtils.getRandomValueFromArray(Constants.DISTANCE_WANT_TO_TRAVEL);
            if((startingStationIndex + travelFromStart) >= this.stationManager.path.length || (startingStationIndex + travelFromStart) < 0) {
                travelFromStart = travelFromStart * -1;
            }
            let endingStationIndex = startingStationIndex + travelFromStart;

            let startingStation = this.stationManager.path[startingStationIndex];
            let endingStation = this.stationManager.path[endingStationIndex];

            const timeToBeginWaitingAtStartingStation = this._getPersonTimeToStartWaitingForTrain();
            startingStation = this.stationManager.stationMap.get(startingStation);
            endingStation = this.stationManager.stationMap.get(endingStation);
            const person = new Person(id, this.stationManager, this.timeManager, startingStation, endingStation, timeToBeginWaitingAtStartingStation);
            people.push(person);
        }

        return people;
    }

    /**
     * Finds when a person should start waiting for the train
     * @returns {number}
     * @private
     */
    _getPersonTimeToStartWaitingForTrain() {
        const isWaitingDuringRushHour = GraphUtils.getRandomValueBetweenNumbers(0, 100) < Constants.PERSON_WILL_WAIT_DURING_RUSH_HOUR_PERCENTAGE;
        if(isWaitingDuringRushHour) {
            return Constants.RUSH_HOUR_START_TIME;
        }
        return GraphUtils.getRandomValueBetweenNumbers(0, Constants.TOTAL_TIME);
    }

    /**
     * has all people update themselves
     */
    handlePeopleUpdate() {
        this.people.forEach(person => {
            person.timeIncrement();
        });
    }

    drawPeople(canvas) {
        this.people.forEach(person => {
            person.draw(canvas.ctx);
        })
    }

}