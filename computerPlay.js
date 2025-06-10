import Gameboard from "./gameboard.js";

export default function computerPlay() {
    let row;
    let col;
    row = Math.floor(Math.random()*10)
    col = Math.floor(Math.random()*10)
    return [row, col]
}