import {Constants} from "./Constants";

/**
 * Keeps track of the time elapsed and when the simulation should end
 */
export class TimeManager {
    constructor() {
        this.timeElapsed = 0;
    }

    incrementTime() {
        this.timeElapsed += Constants.TIME_INCREMENT;
    }

    shouldEndSimulation() {
        return this.timeElapsed > Constants.TOTAL_TIME;
    }
}