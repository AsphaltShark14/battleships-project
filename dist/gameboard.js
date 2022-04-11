"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gameboard = void 0;
const cell_1 = require("./cell");
const ship_1 = require("./ship");
class Gameboard {
    constructor(userType) {
        this.userType = userType;
        this.cells = new Array(10);
        this.userType = userType;
        this.shipsType = [
            new ship_1.Ship(5, 'carrier'),
            new ship_1.Ship(4, 'battleship'),
            new ship_1.Ship(3, 'cruiser'),
            new ship_1.Ship(3, 'submarine'),
            new ship_1.Ship(2, 'destroyer')
        ];
        this.table = document.querySelector(`.${this.userType}`);
        this.generateTable();
        this.populateGameboard();
    }
    generateTable() {
        let i = 0;
        for (let r = 0; r < 10; r++) {
            let row = this.table.insertRow(r);
            for (let c = 0; c < 10; c++) {
                let cell = row.insertCell(c);
                cell.className = 'cell';
                const newCell = new cell_1.Cell(cell);
                this.cells[i] = newCell;
                i++;
            }
        }
    }
    populateGameboard() {
        this.shipsType.map(shipType => this.generateShip(shipType));
    }
    generateShip(shipType) {
        let randomDirection = Math.floor(Math.random() * 2);
        let current = shipType.shipElements[randomDirection];
        if (randomDirection === 0)
            shipType.direction = 1;
        if (randomDirection === 1)
            shipType.direction = 10;
        let randomStart = Math.abs(Math.floor(Math.random() * this.cells.length - (shipType.shipElements[0].length * shipType.direction)));
        const isTaken = current.some(index => this.cells[randomStart + index].htmlElement.classList.contains('taken'));
        const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1);
        const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0);
        if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
            current.map(index => {
                this.cells[randomStart + index].htmlElement.id = `${shipType.name}`;
                if (this.userType === 'player') {
                    this.cells[randomStart + index].htmlElement.classList.add('ship');
                }
                else {
                    this.cells[randomStart + index].htmlElement.classList.add('enemy');
                }
            });
            current.map(index => {
                this.cells[randomStart + index].htmlElement.classList.add('taken');
            });
            if (randomDirection === 0) {
                current.map(index => {
                    this.cells[randomStart + index - 10] ? this.cells[randomStart + index - 10].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index + 10] ? this.cells[randomStart + index + 10].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index - 1] ? this.cells[randomStart + index - 1].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index + current.length + 1] ? this.cells[randomStart + index + current.length + 1].htmlElement.classList.add('taken') : '';
                });
            }
            else if (randomDirection === 1) {
                current.map(index => {
                    this.cells[randomStart + index - 1] ? this.cells[randomStart + index - 1].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index + 1] ? this.cells[randomStart + index + 1].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index - 10] ? this.cells[randomStart + index - 10].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index + current.length + 10] ? this.cells[randomStart + index + current.length + 10].htmlElement.classList.add('taken') : '';
                });
            }
        }
        else
            this.generateShip(shipType);
    }
}
exports.Gameboard = Gameboard;
