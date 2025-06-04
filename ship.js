class Ship {
    constructor(length, hits = 0, sunk = false) {
        this.length = length,
        this.hits = hits,
        this.sunk = sunk
    }

    hit () {
        this.hits++
        return this.hits
    }

    isSunk () {
        return this.length <= this.hits
    }
}

export default Ship;