export class Ship {
    
    shipElements: [number[], number[]];
    direction: number;
    hitCount: number;

    constructor(private shipLength: number, public name: string) {
        this.shipLength = shipLength;
        this.direction = 0;
        this.hitCount = 0;
        const directionX: number[] = [];
        const directionY: number[] = [];
        for (let i = 0; i < this.shipLength; i++){
            directionX.push(i);
        }
        for (let i = 0; i < this.shipLength; i++){
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
