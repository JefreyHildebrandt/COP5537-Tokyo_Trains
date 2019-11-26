import '../css/train.css';
import { TrainGraph } from './core/TrainGraph.js';

document.addEventListener("DOMContentLoaded",() => {
    const tokyoTrainGraph = new TrainGraph();
    tokyoTrainGraph.load().then(() => {
        tokyoTrainGraph.init();
        tokyoTrainGraph.run();
    });
});