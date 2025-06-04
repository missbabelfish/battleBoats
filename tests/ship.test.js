import { Ship } from "../ship";

describe ('Ship', () => {
    let newShip;
    let sunkShip;

    beforeAll(() => {
        newShip = new Ship(5)
        sunkShip = new Ship(3, 3)
        console.log({newShip})
    })

    it('should add a hit when hit is called', () => {
        expect(newShip.hit()).toBe(1)
    })
    
    it('should return sunk when hits = length', () => {
        expect(sunkShip.isSunk()).toBe(true)
    })
})