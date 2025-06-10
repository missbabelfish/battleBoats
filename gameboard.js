import Ship from "./ship.js";

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

        this.ships = new Array(5).fill(null)

    }
    
    placeShip(id, startRow, startCol, length, orient) {
        let ship = new Ship(length)
        const coords = [];
        for (let i = 0; i < length; i++) {
            const r = orient === 'vert' ? startRow + i : startRow;
            const c = orient === 'horiz' ? startCol + i : startCol;
            this.board[r][c].hasShip = true;
            this.board[r][c].shipId = id;
            coords.push([r, c])
        }
        this.ships[id] = { coords, ship }
    }
    
    receiveAttack(row, col) {
        let square = this.board[row][col];
        square.isHit = true;
        let id = square.shipId !== null ? square.shipId : null
        let ship = id !== null ? this.ships[id].ship : null
        if (square.hasShip) {
            ship.hit()
            ship.isSunk()
        }
    }

    allSunk() {
        // check to see if all 5 ships are sunk
        console.log(this.ships[0].ship.sunk)
        return this.ships.every(
            // refactor when there will be no null ships
			ship => ship === null || ship.ship.sunk === true
		);
    }

}

export default Gameboard;