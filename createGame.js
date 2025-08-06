// createGame.js
import Player from './Player.js';

function randomlyPlaceAllShips(gameBoard) {
	// ship definitions: [id, length]
	const ships = [
		[0, 5],
		[1, 4],
		[2, 3],
		[3, 3],
		[4, 2],
	];

	ships.forEach(([id, length]) => {
		let placed = false;

		while (!placed) {
			// pick random orientation
			const orient = Math.random() < 0.5 ? 'horiz' : 'vert';

			// pick a random row/col such that the ship fits in bounds
			const maxRow =
				orient === 'vert'
					? gameBoard.size - length
					: gameBoard.size - 1;
			const maxCol =
				orient === 'horiz'
					? gameBoard.size - length
					: gameBoard.size - 1;

			const row = Math.floor(Math.random() * (maxRow + 1));
			const col = Math.floor(Math.random() * (maxCol + 1));

			// try to place and see if it returns true
			placed = gameBoard.placeShip(id, row, col, length, orient);
		}
	});

    console.log(gameBoard.ships)
	return gameBoard;
}

export default function createGame() {
	const player1 = new Player('player1', 'human');
	const board1 = player1.board;
	const player2 = new Player('player2', 'computer');
	const board2 = player2.board;

    randomlyPlaceAllShips(board2);

	return { player1, player2, board1, board2 };
}

