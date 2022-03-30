"use strict";
class Ship {
    constructor(shipLength) {
        this.shipLength = shipLength;
        this.shipLength = shipLength;
        this.shipElements = Array(this.shipLength).fill(1);
    }
    hit(position) {
        this.shipElements[position - 1] = -1;
    }
    isSunk() {
        return this.shipElements.every(element => element === -1);
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
        console.log(this.cellValue);
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
                if (this.userType == 'computer') {
                    cell.addEventListener('click', this.recieveAttack.bind(this));
                }
                i++;
            }
        }
    }
    placeShips() {
        const ship = new Ship(3);
        const index = this.cells.findIndex(cell => cell.dx == 5 && cell.dy == 4);
        this.cells.map(cell => {
            if (cell.dx == 5 && cell.dy == 4) {
                let i = 0;
                if (i > ship.shipElements.length)
                    return;
                cell.setCell(ship.shipElements[i]);
                i++;
            }
        });
    }
    recieveAttack(e) {
        console.log(e);
    }
}
const playerBoard = new Gameboard('player');
const computerBoard = new Gameboard('computer');
