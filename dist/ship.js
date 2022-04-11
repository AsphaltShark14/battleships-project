"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = void 0;
class Ship {
    constructor(shipLength, name) {
        this.shipLength = shipLength;
        this.name = name;
        this.shipLength = shipLength;
        this.direction = 0;
        this.hitCount = 0;
        const directionX = [];
        const directionY = [];
        for (let i = 0; i < this.shipLength; i++) {
            directionX.push(i);
        }
        for (let i = 0; i < this.shipLength; i++) {
            directionY.push(10 * i);
        }
        this.shipElements = [directionX, directionY];
    }
    hit() {
        this.hitCount++;
    }
    isSunk() {
        return this.hitCount === this.shipLength;
    }
}
exports.Ship = Ship;
