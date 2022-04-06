"use strict";
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
                this.cells[randomStart + index].htmlElement.id = `${shipType.name}`;
                if (this.userType === 'player') {
                    this.cells[randomStart + index].htmlElement.classList.add('ship');
                }
                else {
                    this.cells[randomStart + index].htmlElement.classList.add('enemy');
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
}
class Game {
    constructor() {
        this.playerBoard = new Gameboard('player');
        this.computerBoard = new Gameboard('computer');
        this.currentPlayer = 'player';
        this.isGameOver = false;
        this.shotFired = '-1';
        this.startButton = document.querySelector('button');
        this.playerHits = 0;
        this.computerHits = 0;
        this.gameLoop();
    }
    gameLoop() {
        if (this.isGameOver)
            return;
        if (this.currentPlayer === 'player') {
            // add change of display
            this.computerBoard.cells.map(cell => cell.htmlElement.addEventListener('click', this.playerAttack.bind(this)));
        }
        else if (this.currentPlayer === 'computer') {
            setTimeout(this.computerAttack.bind(this), 1000);
        }
    }
    playerAttack(e) {
        const target = e.target;
        if (target.className.includes('shot-fired'))
            return;
        if (target.className.includes('enemy')) {
            target.classList.add('ship-down');
            this.computerBoard.shipsType.map(ship => {
                if (ship.name === target.id)
                    ship.hit();
            });
        }
        else {
            target.classList.add('miss');
        }
        target.classList.add('shot-fired');
        this.checkWin();
        this.currentPlayer = 'computer';
        this.gameLoop();
    }
    computerAttack() {
        const index = Math.floor(Math.random() * this.playerBoard.cells.length);
        const computerTarget = this.playerBoard.cells[index].htmlElement;
        if (computerTarget.className.includes('shot-fired'))
            this.computerAttack();
        if (computerTarget.className.includes('ship')) {
            computerTarget.classList.add('ship-down');
            this.playerBoard.shipsType.map(ship => {
                if (ship.name === computerTarget.id)
                    ship.hit();
            });
        }
        else {
            computerTarget.classList.add('miss');
        }
        computerTarget.classList.add('shot-fired');
        this.checkWin();
        this.currentPlayer = 'player';
    }
    checkWin() {
        // element = to show info
        if (this.currentPlayer = 'player') {
            this.computerBoard.shipsType.map(ship => {
                if (ship.isSunk()) {
                    //element.textContent =  `You sunk enemy ${this.computerBoard.shipsType[0].name}!`;
                    ship.hitCount = 10;
                    this.playerHits += ship.hitCount;
                    console.log('shipCount: ', ship.hitCount, ship.name);
                }
            });
        }
        else if (this.currentPlayer = 'computer') {
            this.playerBoard.shipsType.map(ship => {
                console.log(ship.isSunk());
                if (ship.isSunk()) {
                    //element.textContent =  `Enemy sunk your ${this.computerBoard.shipsType[0].name}!`;
                    ship.hitCount = 10;
                    this.computerHits += ship.hitCount;
                    console.log('sunk!');
                }
            });
        }
        console.log('playerHits: ', this.playerHits);
        if (this.playerHits == 50) {
            //element.textContent = `You won!;
            console.log('you won!');
            this.gameOver();
        }
        else if (this.computerHits == 50) {
            //element.textContent= 'computer won!';
            console.log('computer won');
            this.gameOver();
        }
    }
    gameOver() {
        this.isGameOver = true;
        this.computerBoard.cells.map(cell => cell.htmlElement.removeEventListener('click', this.playerAttack.bind(this)));
    }
}
const newGame = new Game();
