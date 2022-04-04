"use strict";
class Ship {
    constructor(shipLength, name) {
        this.shipLength = shipLength;
        this.name = name;
        this.shipLength = shipLength;
        this.direction = 0;
        this.hitCount = Array(this.shipLength).fill(1);
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
}
class Gameboard {
    constructor(userType) {
        this.userType = userType;
        this.cells = new Array(10);
        this.userType = userType;
        this.shipsType = [
            new Ship(5, 'carrier'),
            new Ship(4, 'battleship'),
            new Ship(3, 'cruiser'),
            new Ship(3, 'submarine'),
            new Ship(2, 'destroyer')
        ];
        this.table = document.querySelector(`.${this.userType}`);
        let i = 0;
        for (let r = 0; r < 10; r++) {
            let row = this.table.insertRow(r);
            for (let c = 0; c < 10; c++) {
                let cell = row.insertCell(c);
                cell.className = 'cell';
                const newCell = new Cell(cell);
                this.cells[i] = newCell;
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
        let randomDirection = this.generateRandom(2);
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
                if (this.userType === 'player') {
                    this.cells[randomStart + index].htmlElement.classList.add('ship', `${shipType.name}`);
                }
                else {
                    this.cells[randomStart + index].htmlElement.classList.add('enemy', `${shipType.name}`);
                }
            });
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
    recieveAttack(e) {
        const target = e.target;
        if (target.className.includes('enemy') || target.className.includes('ship')) {
            target.classList.add('ship-down');
        }
        else {
            target.classList.add('miss');
        }
    }
}
class Player {
    constructor(currentPlayer) {
        this.currentPlayer = currentPlayer;
        this.destroyerCount = 0;
        this.submarineCount = 0;
        this.cruiserCount = 0;
        this.battleshipCount = 0;
        this.carrierCount = 0;
    }
    markedSquare(classList) {
    }
}
class Game {
    constructor() {
        this.playerBoard = new Gameboard('player');
        this.computerBoard = new Gameboard('computer');
        this.user = new Player('player');
        this.computer = new Player('computer');
    }
    gameLoop() {
        if (isGameOver)
            return;
        this.computerBoard.cells.forEach(cell => cell.htmlElement.addEventListener('click', () => this.computer.markedSquare(cell.htmlElement.classList)));
    }
}
const newGame = new Game();
