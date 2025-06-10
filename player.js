import Gameboard from "./gameboard.js";

class Player {
    constructor(name, type = 'computer') {
        this.name = name;
        // real or computer
        this.type = type; 

        this.board = new Gameboard(10)
    }
}

export default Player;