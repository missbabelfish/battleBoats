// main.js (or index.js)
import createGame from './createGame.js';
import renderBoard from './renderBoard.js';
import computerPlay from './computerPlay.js';
import Gameboard from './gameboard.js';

const shipButtons = document.querySelector('.ship-buttons')

let player1, player2, board1, board2;
// set placement mode
let isPlacingShips = true;
let shipsToPlace = 5;

function startNewGame() {
	// clear old state
	if (player1) {
		// clear containers 
		document.getElementById('player1-board').innerHTML = '';
		document.getElementById('player2-board').innerHTML = '';
	}

	// create fresh boards
	({ player1, player2, board1, board2 } = createGame());
	renderBoard(board1, board2, 'player1-board');
	renderBoard(board2, board1, 'player2-board');

	
}

shipButtons.addEventListener('click', e => {
	const buttons = [...document.getElementsByClassName('ship-button')];
	buttons.forEach(button => {
		button.classList.remove('selected')
	});
	let ship = e.target.closest('button')
	ship.classList.toggle('selected')
})

// hardcoded to 1-player game
document.getElementById('player2-board').addEventListener('click', e => {
	// only act if a .square was clicked
	const sq = e.target.closest('.square');
	if (!sq) return;

	const row = +sq.dataset.row;
	const col = +sq.dataset.col;

	// prevent double hits
	if (board2.board[row][col].isHit) {
		alert('Square already hit—pick another.');
		return;
	}

	// human turn
	const humanWin = board2.receiveAttack(row, col);
	renderBoard(board2, board1, 'player2-board');
	renderBoard(board1, board2, 'player1-board');

	if (humanWin) {
		alert('Player 1 wins!');
		return startNewGame();
	}

	// computer turn
	setTimeout(() => {
		let [r2, c2] = computerPlay();
		while (board1.board[r2][c2].isHit) {
			[r2, c2] = computerPlay();
		}
		const compWin = board1.receiveAttack(r2, c2);

		renderBoard(board2, board1, 'player2-board');
		renderBoard(board1, board2, 'player1-board');

		if (compWin) {
			alert('Player 2 wins!');
			return startNewGame();
		}
	}, 500);
});

document.getElementById('player1-board').addEventListener('mouseover', e => {
	if (!isPlacingShips) {
		return;
	}

})

document.getElementById('player1-board').addEventListener('click', e => {
	if (!isPlacingShips) {
		return;
	}
	const sq = e.target.closest('.square');
	if (!sq) return;



})

// Start the first game
startNewGame();
