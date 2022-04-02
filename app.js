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
    constructor(cell) {
        this.htmlElement = cell;
        this.isChecked = false;
        this.cellValue = 0;
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
                const newCell = new Cell(cell);
                this.cells[i] = newCell;
                // if (this.userType == 'computer') {
                //     cell.addEventListener('click', this.recieveAttack.bind(this));
                // }
                i++;
            }
        }
        this.populateGameboard();
    }
    generateRandom(range) {
        return Math.floor(Math.random() * range);
    }
    populateGameboard() {
        this.shipsType.map(shipType => this.generateShip(shipType));
    }
    generateShip(shipType) {
        const ship = new Ship(shipType);
        let randomDirection = this.generateRandom(2);
        let current = ship.shipElements[randomDirection];
        if (randomDirection === 0)
            ship.direction = 1;
        if (randomDirection === 1)
            ship.direction = 10;
        let randomStart = Math.abs(Math.floor(Math.random() * this.cells.length - (ship.shipElements[0].length * ship.direction)));
        console.log(randomStart);
        const isTaken = current.some(index => this.cells[randomStart + index].htmlElement.classList.contains('taken'));
        const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1);
        const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0);
        if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
            current.map(index => this.cells[randomStart + index].htmlElement.classList.add('ship'));
            current.map(index => this.cells[randomStart + index].htmlElement.classList.add('taken'));
            if (randomDirection === 0) {
                current.map(index => this.cells[randomStart + index - 10] ? this.cells[randomStart + index - 10].htmlElement.classList.add('taken') : '');
                current.map(index => this.cells[randomStart + index + 10] ? this.cells[randomStart + index + 10].htmlElement.classList.add('taken') : '');
            }
            else if (randomDirection === 1) {
                current.map(index => this.cells[randomStart + index - 1] ? this.cells[randomStart + index - 1].htmlElement.classList.add('taken') : '');
                current.map(index => this.cells[randomStart + index + 1] ? this.cells[randomStart + index + 1].htmlElement.classList.add('taken') : '');
            }
        }
        else
            this.generateShip(shipType);
    }
}
const playerBoard = new Gameboard('player');
const computerBoard = new Gameboard('computer');
