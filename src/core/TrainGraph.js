import {StationManager} from "../entity/station/StationManager";
import {Canvas} from "./Canvas";
import {EdgeManager} from "../entity/edge/EdgeManager";
import {TrainManager} from "../entity/train/TrainManager";
import {PersonManager} from "../entity/person/PersonManager";
import {TimeManager} from "./TimeManager";
import {Euler} from "./GraphUtils/Euler";
import {Constants} from "./Constants";
import {Person} from "../entity/person/Person";

/**
 * Main function of the program
 * Keeps track of all data and implements the main loop of the program
 */
export class TrainGraph {
    init() {
        this.stationManager = new StationManager();
        this.stationManager.path = Euler.getEulerianPath();
        const nodeSizes = this.stationManager.nodeSizes;
        const canvasWidth = nodeSizes.largestX - nodeSizes.smallestX;
        const canvasHeight = nodeSizes.largestY - nodeSizes.smallestY;
        this.canvas = new Canvas(canvasWidth, canvasHeight);
        this.initializeChangingEntities();
    }

    initializeChangingEntities() {
        this.stationManager.resetData();
        this.timeManager = new TimeManager();
        this.trainManager = new TrainManager(this.stationManager);
        this.personManager = new PersonManager(this.stationManager, this.timeManager);
    }

    run() {
        if(this.timeManager.timeElapsed % 10 === 0) {
            console.log('Time Elapsed:' + this.timeManager.timeElapsed);
        }
        this.canvas.clearCanvas()
        this.updateData();
        this.drawAll();
        if(this.timeManager.shouldEndSimulation()) {
            alert(this.createAlert());
        }
        else {
            window.requestAnimationFrame(() => {
                this.run();
            });
        }
    }

    /**
     * Alerts the user when the simulation is finished and gives data
     * @returns {string}
     */
    createAlert() {
        let infoString = '';
        infoString += '- The simulation lasted ' + Constants.TOTAL_TIME + ' ticks\n';
        infoString += '- There were ' + Constants.NUMBER_OF_PEOPLE + ' people\n';
        infoString += '- There were ' + Constants.NUMBER_OF_TRAINS + ' trains\n';
        infoString += '- The trains could choose from the following to be express: ' + Constants.NUMBER_OF_STOPS_FOR_TRAINS_RANDOMIZE + '\n';
        infoString += '- The distance increments people could choose from are:\n       ' + Constants.DISTANCE_WANT_TO_TRAVEL + '\n';
        infoString += '- The average wait time at the stations were: ';
        const totalStations = 369;
        let totalTimeWaited = 0;
        this.stationManager.stationMap.forEach(station => {
            totalTimeWaited += station.extraTimePeopleSpentWaiting;
        });
        infoString += Math.round(totalTimeWaited / totalStations) + '\n';

        let totalPeopleArrived = 0;
        this.personManager.people.forEach(person => {
            if(person.state === Person.State.ARRIVED) {
                totalPeopleArrived++;
            }
        });
        infoString += 'The total number of people that arrived was: ' + totalPeopleArrived + '\n';
        infoString += 'Please refresh the browser to run again';

        return infoString;
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
}