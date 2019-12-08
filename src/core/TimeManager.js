import {Constants} from "./Constants";

export class TimeManager {
    constructor() {
        this.timeElapsed = 0;
    }

    convertTimeElapsedToSeconds() {
        return this.timeElapsed;
    }

    incrementTime() {
        this.timeElapsed += Constants.TIME_INCREMENT;
    }

    shouldEndSimulation() {
        return this.timeElapsed > Constants.TOTAL_TIME;
    }
}