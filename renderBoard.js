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
				gameBoard.receiveAttack(r, c);
				renderBoard(player, gameBoard, opponentBoard, containerId);
			});

			boardContainer.appendChild(div);
		}
	}

    // if (player.name === 'player2' && player.type === 'computer') {
    //     console.log('is computer')
    //     boardContainer.addEventListener('click', () => {
    //         const [row, col] = computerPlay()
    //         console.log({row, col})
    //         setTimeout(() => {
    //             opponentBoard.receiveAttack(row, col)
    //             renderBoard(player, gameBoard, opponentBoard, containerId)
    //         }, 1500);
    //     })
    // }
}
