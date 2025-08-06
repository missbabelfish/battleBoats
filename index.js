// main.js (or index.js)
import createGame from './createGame.js';
import renderBoard from './renderBoard.js';
import computerPlay from './computerPlay.js';
import Gameboard from './gameboard.js';

const boats = {
	sub: {
		length: 5,
		id: 0,
	},
	yacht: {
		length: 4,
		id: 1,
	},
	tug: {
		length: 3,
		id: 2,
	},
	barge: {
		length: 3,
		id: 3,
	},
	dinghy: {
		length: 2,
		id: 4,
	},
}

const humanBoard = document.getElementById('player1-board')
const shipButtons = document.querySelector('.ship-buttons')
const orientButtons = document.querySelector('.orient-buttons')

let player1, player2, board1, board2;
// set placement mode
let isPlacingShips = true;
let shipsToPlace = 5;
let currentShip;
let currentOrient;
let validPlacement = false;
let currentShipCoords = [];

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
	const shipButtons = [...document.getElementsByClassName('ship-button')];
	shipButtons.forEach(button => {
		button.classList.remove('selected');
	});
	let shipButton = e.target.closest('button')
	shipButton.classList.toggle('selected')
	let currentShipId = shipButton.id
	currentShip = { length: boats[currentShipId].length, id: boats[currentShipId].id }

})

orientButtons.addEventListener('click', e => {
	const orientButtons = [...document.getElementsByClassName('orient-button')];
	orientButtons.forEach(button => {
		button.classList.remove('selected');
	});
	let orientButton = e.target.closest('button');
	orientButton.classList.toggle('selected');
	currentOrient = orientButton.id
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

// display possible ship placement
humanBoard.addEventListener('mouseover', e => {
	if (!isPlacingShips || !currentShip || !currentOrient) {
		return;
	}

	const cells = ([...humanBoard.children])
	cells.forEach(cell => {
		cell.classList.remove('placing')
		cell.classList.remove('invalid')
	})
	
	const sq = e.target.closest('.square');
	if (!sq) return;
	
	const row = +sq.dataset.row;
	const col = +sq.dataset.col;

	// calculate occupied squares, set validity
	if (currentOrient === 'horiz') {
		validPlacement = col + currentShip.length - 1 <= 9;
	}
	if (currentOrient === 'vert') {
		validPlacement = row + currentShip.length - 1 <= 9;
	}

	// create preview coords
	currentShipCoords = [];
	for (let i = 0; i < currentShip.length; i++) {
		if (currentOrient === 'horiz') {
			currentShipCoords.push([row, col + i]);
		} else {
			currentShipCoords.push([row + i, col]);
		}
	}

	// apply preview classes to cells
	if (currentShipCoords) {
		for (let [row, col] of currentShipCoords) {
			for (let i = 0; i < cells.length; i++) {
				if (+cells[i].dataset.row === row && +cells[i].dataset.col === col) {
					if (board1.board[row][col].hasShip) {
						cells[i].classList.add('invalid');
						validPlacement = false;
					}
					cells[i].classList.add(validPlacement ? 'placing' : 'invalid')
				}
			}
		}
	}

})

// confirm ship placement
document.getElementById('player1-board').addEventListener('click', e => {
	if (!isPlacingShips || !validPlacement) {
		return;
	}
	const sq = e.target.closest('.square');
	if (!sq) return;

	const cells = [...humanBoard.children];

	const row = +sq.dataset.row;
	const col = +sq.dataset.col;

	if (currentShipCoords) {
		for (let [row, col] of currentShipCoords) {
			for (let i = 0; i < cells.length; i++) {
				if (
					+cells[i].dataset.row === row &&
					+cells[i].dataset.col === col
				) {
					cells[i].classList.remove('placing');
					cells[i].classList.add('placed');
				}
			}
		}
	}
	
	board1.placeShip(currentShip.id, row, col, currentShip.length, currentOrient)
	console.log({board1})

})

// Start the first game
startNewGame();
