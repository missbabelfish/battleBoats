import computerPlay from "../computerPlay.js";
import Gameboard from "../gameboard.js";


describe('computerPlay()', () => {
    let newBoard;

    beforeAll(() => {
		newBoard = new Gameboard(10);
		newBoard.placeShip(0, 0, 0, 2, 'horiz');
		newBoard.placeShip(4, 5, 5, 5, 'vert');
	});

    it('should generate a random set of coordinates on the board', () => {
        const [row, col] = computerPlay()
        expect(row).toBeGreaterThanOrEqual(0)
        expect(row).toBeLessThanOrEqual(9)
        expect(col).toBeGreaterThanOrEqual(0)
        expect(col).toBeLessThanOrEqual(9)
    })

    
})