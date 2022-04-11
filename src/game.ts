import { User } from "./types";
import { Gameboard } from "./gameboard";

export class Game {

    private playerBoard: Gameboard;
    private computerBoard: Gameboard;
    private currentPlayer: User;
    private isGameOver: boolean;
    private shotFired: string;
    private startButton: HTMLButtonElement;
    private promptElement: HTMLSpanElement;
    private playerHits: number;
    private computerHits: number;

    constructor() {
        this.playerBoard = new Gameboard('player');
        this.computerBoard = new Gameboard('computer');
        this.currentPlayer = 'player';
        this.isGameOver = false;
        this.shotFired = '-1';
        this.startButton = document.querySelector('button')!;
        this.promptElement = document.querySelector('.prompt')!;
        this.playerHits = 0;
        this.computerHits = 0;

        this.gameLoop();
    }

    gameLoop() {
        if (this.isGameOver) return;
        if (this.currentPlayer === 'player') {
            this.promptElement.textContent = 'Your turn!';
            this.computerBoard.cells.map(cell => cell.htmlElement.addEventListener('click', this.playerAttack.bind(this)));
        } else if (this.currentPlayer === 'computer') {
            this.promptElement.textContent = `Computer's turn!`;
            setTimeout(this.computerAttack.bind(this), 1000);
        }
        

    }

    private playerAttack(e: Event) {
        const target = e.target as Element;

        if (target.className.includes('shot-fired')) return;
        if (target.className.includes('enemy')) {
            target.classList.add('ship-down');
            this.computerBoard.shipsType.map(ship => {
                if (ship.name === target.id) ship.hit();
            })
        } else {
            target.classList.add('miss');
        }

        target.classList.add('shot-fired');
        this.checkWin();
        this.currentPlayer = 'computer';
        this.gameLoop();

    }

    private computerAttack() {
        const index = Math.floor(Math.random() * this.playerBoard.cells.length);
        const computerTarget = this.playerBoard.cells[index].htmlElement;

        if (computerTarget.className.includes('shot-fired')) this.computerAttack();
        if (computerTarget.className.includes('ship')) {
            computerTarget.classList.add('ship-down');
            this.playerBoard.shipsType.map(ship => {
                if (ship.name === computerTarget.id) ship.hit();
            })
        } else {
            computerTarget.classList.add('miss');
        }

        computerTarget.classList.add('shot-fired');
        this.checkWin();
        this.currentPlayer = 'player';
        this.promptElement.textContent = 'Your turn!';
    }

    private checkWin() {
        if (this.currentPlayer = 'player') {
            this.computerBoard.shipsType.map(ship => {
                if (ship.isSunk()) {
                    this.promptElement.textContent =  `You sunk enemy ${this.computerBoard.shipsType[0].name}!`;
                    ship.hitCount = 10;
                    this.playerHits += ship.hitCount;
                }
            })
        } else if (this.currentPlayer = 'computer') {
            this.playerBoard.shipsType.map(ship => {
                console.log(ship.isSunk());
                if (ship.isSunk()) {
                    this.promptElement.textContent =  `Enemy sunk your ${this.computerBoard.shipsType[0].name}!`;
                    ship.hitCount = 10;
                    this.computerHits += ship.hitCount;
                }
            })
        }
        if (this.playerHits == 50) {
            this.promptElement.textContent = 'You won!';
            this.gameOver();
        } else if (this.computerHits == 50) {
            this.promptElement.textContent = 'You lost!';
            this.gameOver();
        }
    }

    private gameOver() {
        this.isGameOver = true;
        this.computerBoard.cells.map(cell => cell.htmlElement.removeEventListener('click', this.playerAttack.bind(this)));
    }
    
}