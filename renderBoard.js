import Player from './player.js';

export default function renderBoard(gameBoard, containerId) {
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
				gameBoard.receiveAttack(r, c);
				renderBoard(gameBoard, containerId);
			});

			boardContainer.appendChild(div);
		}
	}
}
