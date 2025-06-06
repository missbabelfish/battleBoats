import Ship from "./ship";
import Gameboard from "./gameboard";

class Player {
    constructor(type = 'computer') {
        // real or computer
        this.type = type; 

        this.board = new Gameboard(10)
    }
}

export default Player;