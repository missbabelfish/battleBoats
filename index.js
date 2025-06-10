import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import Player from "./player.js";

const player1 = new Player('human');
const player1Board = player1.board
const player2 = new Player()
console.log(player2)
const player2Board = player2.board
console.log({player2Board})

player1Board.placeShip(0, 0, 0, 5, 'horiz');
player1Board.placeShip(1, 0, 5, 4, 'vert');
player1Board.placeShip(2, 0, 9, 3, 'vert');
player1Board.placeShip(3, 5, 9, 3, 'vert');
player1Board.placeShip(4, 9, 5, 2, 'horiz');

player2Board.placeShip(0, 0, 9, 5, 'vert');
player2Board.placeShip(1, 2, 1, 4, 'vert');
player2Board.placeShip(2, 6, 2, 3, 'horiz');
player2Board.placeShip(3, 9, 0, 3, 'horiz');
player2Board.placeShip(4, 3, 7, 2, 'horiz');

function renderBoard(gameBoard, containerId) {
    console.log({gameBoard, containerId})
    const boardContainer = document.getElementById(containerId)
    console.log({boardContainer})
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



renderBoard(player1Board, 'player1-board');
renderBoard(player2Board, 'player2-board');
