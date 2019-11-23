import '../css/train.css';
import { Game } from './core/Game.js';

document.addEventListener("DOMContentLoaded",() => {
    const skiGame = new Game();
    skiGame.load().then(() => {
        skiGame.init();
        skiGame.run();
    });
});