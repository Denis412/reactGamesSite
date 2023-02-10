const pushing = (cells, row, column) => {
    for(let i = 0; i < cells.length; i++) {
        if(cells[i]?.row === row && cells[i]?.column === column)
            return;
    }
    cells.push({row, column});
}

const pushCells = (map, emptyCells, valueCells, row, column, rows, columns) => {
    if(row < 0 || column < 0 || row >= rows || column >= columns)
        return;

    if(map[row][column] === 0)
        pushing(emptyCells, row, column);
    else
        pushing(valueCells, row, column);
}

const pushingCell = (map, emptyCells, valueCells, row, column, rows, columns) => {
    pushCells(map, emptyCells, valueCells, row, column, rows, columns);
    pushCells(map, emptyCells, valueCells, row + 1, column - 1, rows, columns);
    pushCells(map, emptyCells, valueCells, row + 1, column, rows, columns);
    pushCells(map, emptyCells, valueCells, row + 1, column + 1, rows, columns);

    pushCells(map, emptyCells, valueCells, row, column - 1, rows, columns);
    pushCells(map, emptyCells, valueCells, row, column + 1, rows, columns);

    pushCells(map, emptyCells, valueCells, row - 1, column - 1, rows, columns);
    pushCells(map, emptyCells, valueCells, row - 1, column, rows, columns);
    pushCells(map, emptyCells, valueCells, row - 1, column + 1, rows, columns);
}

export function clickEmptyCell(map, row, column, rows, columns) {
    const emptyCells = [];
    const valueCells = [];

    pushingCell(map, emptyCells, valueCells, row, column, rows, columns);

    if(emptyCells.length > 1) {
        for(let i = 1; i < emptyCells.length; i++)
            pushingCell(map, emptyCells, valueCells, emptyCells[i].row, emptyCells[i].column, rows, columns);
    }

    return {emptyCells, valueCells};
}