// createGame.js
import Player from './Player.js';

export default function createGame() {
	const player1 = new Player('player1', 'human');
	const board1 = player1.board;
	const player2 = new Player('player2', 'computer');
	const board2 = player2.board;

    board1.placeShip(0, 0, 0, 5, 'horiz');
    board1.placeShip(1, 1, 5, 4, 'vert');
    board1.placeShip(2, 0, 9, 3, 'vert');
    board1.placeShip(3, 5, 9, 3, 'vert');
    board1.placeShip(4, 9, 5, 2, 'horiz');

    board2.placeShip(0, 0, 9, 5, 'vert');
    board2.placeShip(1, 2, 1, 4, 'vert');
    board2.placeShip(2, 6, 2, 3, 'horiz');
    board2.placeShip(3, 9, 0, 3, 'horiz');
    board2.placeShip(4, 3, 7, 2, 'horiz');

	return { player1, player2, board1, board2 };
}

