import Player from './player.js';
import computerPlay from './computerPlay.js';

export default function renderBoard(gameBoard, opponentBoard, containerId) {
	const boardContainer = document.getElementById(containerId);
	boardContainer.innerHTML = '';

	for (let r = 0; r < gameBoard.size; r++) {
		for (let c = 0; c < gameBoard.size; c++) {
			const square = gameBoard.board[r][c];
			const div = document.createElement('div');
			div.className = 'square';
			div.dataset.row = r;
			div.dataset.col = c;

			// hit/miss styling
			if (square.isHit) {
				div.classList.add(square.hasShip ? 'ship-hit' : 'hit');
			}

			div.addEventListener('click', () => {
				if (containerId === 'player2-board') {
					if (square.isHit) {
						alert('square already hit. Choose another square')
					} else {
						let row, col;
							[row, col] = computerPlay();
							while (opponentBoard.board[row][col].isHit) {
								([row, col] = computerPlay());
							}
							setTimeout(() => {
								const isOver = opponentBoard.receiveAttack(row, col);
								if (isOver) {
									alert('Player 2 wins!!');
								} else {
									renderBoard(opponentBoard, gameBoard, 'player1-board');
								}
							}, 1000);
					}
				}
				const isOver = gameBoard.receiveAttack(r, c);
				if (isOver) console.log('game over');
				renderBoard(gameBoard, opponentBoard, containerId);
			});

			boardContainer.appendChild(div);
		}
	}
}
