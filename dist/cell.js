"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
class Cell {
    constructor(cell) {
        this.htmlElement = cell;
        this.isChecked = false;
        this.cellValue = 0;
    }
}
exports.Cell = Cell;
