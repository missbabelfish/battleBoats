import Ship from "./ship";
import Gameboard from "./gameboard";
import Player from "./player";

const board = new Gameboard(10);

// need to rewrite this with Player as entry point
function renderBoard(gameBoard, containerId) {
    const boardContainer = document.getElementById(containerId)
    boardContainer.innerHTML = ''

    for (let r = 0; r < gameBoard.size; r++) {
        for (let c = 0; c < gameBoard.size; c++) {
            const square = gameBoard.board[r][c];
            const div = document.createElement('div');
            div.className = 'square';
            div.dataset.row = r;
            div.dataset.col = c;

            // hit/miss styling
            if (square.isHit) {
                div.classList.add(square.hasShip ? 'ship-hit' : 'hit')
            }

            div.addEventListener('click', () => {
                gameBoard.receiveAttack(r, c);
                renderBoard(gameBoard, containerId)
            })

            boardContainer.appendChild(div);
        }
    }
}

