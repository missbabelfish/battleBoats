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

		this.ships = new Array(5).fill(null);
	}

	placeShip(id, startRow, startCol, length, orient) {
		const coords = [];

		// 1) Compute all target coords
		for (let i = 0; i < length; i++) {
			const r = orient === 'vert' ? startRow + i : startRow;
			const c = orient === 'horiz' ? startCol + i : startCol;
			coords.push([r, c]);
		}

		// 2) Validate bounds & no overlap
		for (const [r, c] of coords) {
			if (r < 0 || c < 0 || r >= this.size || c >= this.size) {
				console.log(
					`placeShip(${id},${length}) out of bounds at [${r},${c}]`
				);
				return false;
			}
			if (this.board[r][c].hasShip) {
				console.log(
					`placeShip(${id},${length}) overlap at [${r},${c}]`
				);
				return false;
			}
		}

		// 3) Commit placement
		const ship = new Ship(length);
		for (const [r, c] of coords) {
			this.board[r][c].hasShip = true;
			this.board[r][c].shipId = id;
		}
		this.ships[id] = { coords, ship };

		return true;
	}

	receiveAttack(row, col) {
		let square = this.board[row][col];
		square.isHit = true;
		let id = square.shipId !== null ? square.shipId : null;
		let ship = id !== null ? this.ships[id].ship : null;
		if (square.hasShip) {
			ship.hit();
			if (ship.isSunk()) {
				if (this.allSunk()) {
					return true;
				}
			}
		}
	}

	allSunk() {
		// check to see if all 5 ships are sunk
		const allSunk = this.ships.every(
			// refactor when there will be no null ships
			ship => ship === null || ship.ship.sunk === true
		);
		if (allSunk) {
			return true;
		}
	}
}

export default Gameboard;