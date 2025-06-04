import Ship from "./ship";

class Gameboard {
    constructor(size = 10) {
        this.size = size;
        
        this.board = Array.from({ length: size }, () => 
            Array.from({ length: size }, () => ({
                hasShip: false,
                shipId: null,
                isHit: false,
            }))
        );

        this.ships = {
            /*
            shipId : {
                coords: [
                    [0,0],
                    [0,1]
                ],
                length: 2,
                hits: 0,
                sunk: false ???
            }
            
            */
        };

    }
    
    placeShip(shipId, startRow, startCol, length, orient) {
        // generate ID based on which ships have been placed (1-5?)
        // loop through [r...r+length] or [c...c+length], mark each cell's hasShip and set shipId. Store coords in this.ships.

    }
    
    receiveAttack(row, col) {
        // flip this.board[row][col].isHit = true
        // check if hasShip -> ship.hit() -> 
        // if isHit but !hasShip, mark/display missed
    }

    allSunk() {
        // check to see if all 5 ships are sunk - where tracking sunk boolean?
    }

}

export default Gameboard;