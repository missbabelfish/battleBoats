export default function renderBoard(playerBoard, opponentBoard, containerId) {
	const container = document.getElementById(containerId);
	container.innerHTML = '';

	for (let r = 0; r < playerBoard.size; r++) {
		for (let c = 0; c < playerBoard.size; c++) {
			const cell = playerBoard.board[r][c];
			const div = document.createElement('div');
			div.className = 'square';
			div.dataset.row = r;
			div.dataset.col = c;
			if(cell.hasShip) {
				div.classList.add('placed')
			}
			if (cell.isHit) {
				div.classList.add(cell.hasShip ? 'ship-hit' : 'hit');
			}
			container.appendChild(div);
		}
	}
}
