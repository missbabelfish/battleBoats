import Ship from '../ship';
import Gameboard from '../gameboard';
import Player from '../player';

describe('placeShip()', () => {
    let newBoard;

    beforeAll(() => {
        newBoard = new Gameboard(10)
        newBoard.placeShip(0, 0, 0, 2, 'horiz')
        newBoard.placeShip(4, 5, 5, 5, 'vert')
    })

    it('should add a ship object with ID to ships tracker', () => {
        expect(newBoard.ships.hasOwnProperty(0)).toBe(true)
        expect(typeof newBoard.ships).toBe('object')
    })

    it('should create coordinates for ship when placed', () => {
        expect(newBoard.ships[0].coords).toEqual([[0, 0], [0, 1]])
    })

    it('should update squares with hasShip flag', () => {
        expect(newBoard.board[9][5].hasShip).toBe(true)
    })
    
    it('should update squares with ship ID', () => {
        expect(newBoard.board[7][5].shipId).toBe(4)
    })
    
    it('should create isHit flag', () => {
        expect(newBoard.board[0][0].isHit).toBe(false)
    })
    
})

describe('receiveAttack()', () => {
    let board, shipSpy;

    beforeEach(() => {
        board = new Gameboard(10);
        board.placeShip(0, 2, 2, 3, 'horiz')
    })

    describe('attack is a hit', () => {
        beforeEach(() => {
            const shipInstance = board.ships[0].ship;
            shipSpy = jest.spyOn(shipInstance, 'isSunk');

            board.receiveAttack(2, 3)
        })

        it('should fire hit() when attack is a hit', () => {
            expect(board.ships[0].ship.hits).toBe(1)
        })

        it('should mark board square as hit', () => {
            expect(board.board[2][3].isHit).toBe(true)
        })

        it('should check to see if ship is sunk on hit', () => {
            expect(board.ships[0].ship.isSunk()).toBe(false)
        })
        
        it('checks isSunk() exactly once', () => {
            expect(shipSpy).toHaveBeenCalledTimes(1);
        })
    })

    describe('attack is a miss', () => {
        beforeEach(() => {
            board.receiveAttack(0, 0);
        })

        it('records miss when attacking empty cell', () => {
            expect(board.board[0][0].hasShip).toBe(false);
            expect(board.board[0][0].isHit).toBe(true);
        });

        it('does not increment any ship hits', () => {
            expect(board.ships[0].ship.hits).toBe(0)
        })
    })

    describe('attack sinks a ship', () => {
        beforeEach(() => {

            board.receiveAttack(2, 2)
            board.receiveAttack(2, 3)
            board.receiveAttack(2, 4)
        })

        it('should record a sunken ship', () => {
            expect(board.ships[0].ship.length).toBe(3)
            expect(board.ships[0].ship.hits).toBe(3)
            expect(board.ships[0].ship.sunk).toBe(true)
        })

        it('should check to see if all ships are sunk', () => {
            // need to retest with all ships in place
            expect(board.allSunk()).toBe(true)
        })

    })
})