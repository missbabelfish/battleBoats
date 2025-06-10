import Player from "./player.js";
import renderBoard from "./renderBoard.js";
import computerPlay from "./computerPlay.js";

const player1 = new Player('player1', 'human');
const player1Board = player1.board
const player2 = new Player('player2')
const player2Board = player2.board

player1Board.placeShip(0, 0, 0, 5, 'horiz');
player1Board.placeShip(1, 1, 5, 4, 'vert');
player1Board.placeShip(2, 0, 9, 3, 'vert');
player1Board.placeShip(3, 5, 9, 3, 'vert');
player1Board.placeShip(4, 9, 5, 2, 'horiz');

player2Board.placeShip(0, 0, 9, 5, 'vert');
player2Board.placeShip(1, 2, 1, 4, 'vert');
player2Board.placeShip(2, 6, 2, 3, 'horiz');
player2Board.placeShip(3, 9, 0, 3, 'horiz');
player2Board.placeShip(4, 3, 7, 2, 'horiz');

renderBoard(player1, player1Board, player2Board, 'player1-board');
renderBoard(player2, player2Board, player1Board, 'player2-board');

const player2Container = document.getElementById('player2-board');

player2Container.addEventListener('click', () => {
	let row, col;
	[row, col] = computerPlay();
	while (player1Board.board[row][col].isHit) {
		([row, col] = computerPlay());
	}
	setTimeout(() => {
		player1Board.receiveAttack(row, col);
		renderBoard(player1, player1Board, player2Board, 'player1-board');
	}, 1000);
});