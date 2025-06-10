import Player from './player.js';
import computerPlay from './computerPlay.js';

export default function renderBoard(player, gameBoard, opponentBoard, containerId) {
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
				const isOver = gameBoard.receiveAttack(r, c);
                if (isOver) console.log('game over')
				renderBoard(player, gameBoard, opponentBoard, containerId);
			});

			boardContainer.appendChild(div);
		}
	}
}
