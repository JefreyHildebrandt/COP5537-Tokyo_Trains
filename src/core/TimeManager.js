import {Constants} from "./Constants";

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