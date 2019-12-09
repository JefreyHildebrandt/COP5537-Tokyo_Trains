export class Constants {
    //TRAINS
    static NUMBER_OF_TRAINS = 100;
    static NUMBER_OF_STOPS_FOR_TRAINS_RANDOMIZE = [1, 2, 3];
    static TIME_TO_WAIT_TRAINS_RANDOMIZE = [30];
    static TRAIN_SPEED_RANDOMIZE = [50];

    //PEOPLE
    static NUMBER_OF_PEOPLE = 1000;
    static PERSON_WILL_WAIT_DURING_RUSH_HOUR_PERCENTAGE= 10;
    static RUSH_HOUR_START_TIME = Constants.TOTAL_TIME/2;
    static DISTANCE_WANT_TO_TRAVEL = [5, -5, 10, -10, 15, -15];

    //TIME
    static TIME_INCREMENT = 1;
    static TOTAL_TIME = 1000;
}