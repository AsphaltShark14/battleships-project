type Coordinates = { x: number, y: number };
type User = 'player' | 'computer';

class Ship {
    
    shipElements: number[];

    constructor(private shipLength: number) {
        this.shipLength = shipLength;
        this.shipElements = Array(this.shipLength).fill(1);
    }

    hit(position: number) {
        this.shipElements[position - 1] = -1;
    }

    isSunk(): boolean {
        return this.shipElements.every(element => element === -1);
    }

}

class Cell {
    cellValue: number;
    htmlElement: HTMLElement;
    isChecked: boolean;
    dx: number;
    dy: number;
   constructor(cell: HTMLElement, dx:number, dy:number) {
       this.htmlElement = cell;
       this.isChecked = false;
       this.cellValue = 0;
       this.dx = dx;
       this.dy = dy;
   }
    
    setCell(value: number) {
      if (this.isChecked) return;
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
    cells: Cell[];
    table: HTMLTableElement;
    shipsType: number[];

    constructor(public userType: User) {
        this.cells = new Array(10);
        this.userType = userType;
        this.shipsType = [5, 4, 3, 3, 2];
        this.table = document.querySelector(`.${this.userType}`)!;
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
    
    placeShip(shipType: number) {
            let ship = new Ship(shipType);
            let randomX: number = Math.floor(Math.random() * 9);
            let randomY: number = Math.floor(Math.random() * 9);
            const index = this.cells.findIndex(cell => cell.dx == randomX && cell.dy == randomY);
            for (let i = 0; i < ship.shipElements.length; i++) {
                this.cells[index + i].setCell(1);
        }
        
        
    }

    recieveAttack(e: Event) {
        console.log(e);
    }
}

const playerBoard = new Gameboard('player');
const computerBoard = new Gameboard('computer');
