import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

class Player {
    constructor(type = 'computer') {
        // real or computer
        this.type = type; 

        this.board = new Gameboard(10)
    }
}

export default Player;