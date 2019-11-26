import {Entity} from "../Entity";
import {AssetManager} from "../../core/AssetManager";

export class Station extends Entity {
    constructor(x, y, address, stationName, index, id) {
        super(x, y, AssetManager.trainStation);
        this.index = index;
        this.address = address;
        this.stationName = stationName;
        this.selected = false;
        this.edges = [];
        this.peopleAtStation = [];
        this.trainsAtStation = [];
        this.id = id;
    }
}