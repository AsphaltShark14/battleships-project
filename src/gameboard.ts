import { Cell } from "./cell";
import { Ship } from "./ship";
import { User } from "./types";

export class Gameboard {
    cells: Cell[];
    table: HTMLTableElement;
    shipsType: Ship[];

    constructor(public userType: User) {
        this.cells = new Array(10);
        this.userType = userType;
        this.shipsType = [
            new Ship(5, 'carrier'),
            new Ship(4, 'battleship'),
            new Ship(3, 'cruiser'),
            new Ship(3, 'submarine'),
            new Ship(2, 'destroyer')
        ];
        this.table = document.querySelector(`.${this.userType}`)!;
        
        this.generateTable();
        this.populateGameboard();
    }

    private generateTable() {
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
    }

    private populateGameboard() {
        this.shipsType.map(shipType => this.generateShip(shipType));
    }

    private generateShip(shipType: Ship) {
        let randomDirection = Math.floor(Math.random() * 2);
        let current = shipType.shipElements[randomDirection];
        if (randomDirection === 0) shipType.direction = 1;
        if (randomDirection === 1) shipType.direction = 10;
        let randomStart = Math.abs(Math.floor(Math.random() * this.cells.length - (shipType.shipElements[0].length * shipType.direction)));

        const isTaken = current.some(index => this.cells[randomStart + index].htmlElement.classList.contains('taken'));
        const isAtRightEdge = current.some(index => (randomStart + index) % 10 === 10 - 1);
        const isAtLeftEdge = current.some(index => (randomStart + index) % 10 === 0);

        if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
            current.map(index => {
                this.cells[randomStart + index].htmlElement.id = `${shipType.name}`;
                if (this.userType === 'player') {
                    this.cells[randomStart + index].htmlElement.classList.add('ship');
                } else {
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
            } else if (randomDirection === 1) {
                current.map(index => {
                    this.cells[randomStart + index - 1] ? this.cells[randomStart + index - 1].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index + 1] ? this.cells[randomStart + index + 1].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index - 10] ? this.cells[randomStart + index - 10].htmlElement.classList.add('taken') : '';
                    this.cells[randomStart + index + current.length + 10] ? this.cells[randomStart + index + current.length + 10].htmlElement.classList.add('taken') : '';
                });
            }
        } else this.generateShip(shipType);
    }
    
}