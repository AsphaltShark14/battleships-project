"use strict";
class Ship {
    constructor(shipLength) {
        this.shipLength = shipLength;
        this.shipLength = shipLength;
        this.direction = 0;
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
}
class Cell {
    constructor(cell, dx, dy) {
        this.htmlElement = cell;
        this.isChecked = false;
        this.cellValue = 0;
        this.dx = dx;
        this.dy = dy;
    }
    setCell(value) {
        if (this.isChecked)
            return;
        this.cellValue = value;
        switch (value) {
            case -1:
                this.htmlElement.className = 'ship-down';
                break;
            case 1:
                this.htmlElement.className = 'ship';
                break;
        }
        this.isChecked = true;
    }
}
class Gameboard {
    constructor(userType) {
        this.userType = userType;
        this.cells = new Array(10);
        this.userType = userType;
        this.shipsType = [5, 4, 3, 3, 2];
        this.table = document.querySelector(`.${this.userType}`);
        let i = 0;
        for (let r = 0; r < 10; r++) {
            let row = this.table.insertRow(r);
            for (let c = 0; c < 10; c++) {
                let cell = row.insertCell(c);
                cell.className = 'cell';
                let dx = i < 9 ? i : i % 10;
                let dy = Math.floor(i / 10);
                const newCell = new Cell(cell, dx, dy);
                this.cells[i] = newCell;
                // if (this.userType == 'computer') {
                //     cell.addEventListener('click', this.recieveAttack.bind(this));
                // }
                i++;
            }
        }
    }
    generateRandom(range) {
        return Math.floor(Math.random() * range);
    }
    populateGameboard() {
        this.shipsType.map(shipType => this.generateShip(shipType));
    }
    generateShip(shipType) {
        const ship = new Ship(shipType);
        let randomDirection = this.generateRandom(ship.shipElements.length);
        let current = ship.shipElements[randomDirection];
        if (randomDirection === 0)
            ship.direction = 1;
        if (randomDirection === 1)
            ship.direction = 10;
        let randomStart = Math.abs(Math.floor(Math.random() * this.cells.length - (ship.shipElements[0].length * ship.direction)));
        const isTaken = current.some(index => this.cells[randomStart + index].htmlElement.classList.contains('ship'));
        const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1);
        const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0);
        if (!isTaken && !isAtRightEdge && !isAtLeftEdge)
            current.forEach(index => this.cells[randomStart + index].htmlElement.classList.add('ship'));
        else
            this.generateShip(shipType);
    }
}
const playerBoard = new Gameboard('player');
const computerBoard = new Gameboard('computer');
