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
                if (this.userType == 'computer') {
                    cell.addEventListener('click', this.recieveAttack.bind(this));
                }
                i++;
            }
        }
    }
    populateGameboard() {
        this.shipsType.map(ship => this.placeShip(ship));
    }
    placeShip(shipType) {
        let ship = new Ship(shipType);
        let randomX = Math.floor(Math.random() * 9);
        let randomY = Math.floor(Math.random() * 9);
        const index = this.cells.findIndex(cell => cell.dx == randomX && cell.dy == randomY);
        for (let i = 0; i < ship.shipElements.length; i++) {
            this.cells[index + i].setCell(1);
        }
    }
    recieveAttack(e) {
        console.log(e);
    }
}
const playerBoard = new Gameboard('player');
const computerBoard = new Gameboard('computer');
