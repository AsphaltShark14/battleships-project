export class Cell {
    cellValue: number;
    htmlElement: HTMLElement;
    isChecked: boolean;
   
    constructor(cell: HTMLElement) {
       this.htmlElement = cell;
       this.isChecked = false;
       this.cellValue = 0;
   }
    
}