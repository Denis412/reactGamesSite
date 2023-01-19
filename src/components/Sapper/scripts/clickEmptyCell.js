const pushing = (cells, row, column) => {
    for(let i = 0; i < cells.length; i++) {
        if(cells[i]?.row === row && cells[i]?.column === column)
            return;
    }
    cells.push({row, column});
}
const pushCell = (map, emptyCell, valuesCells, row, column, rows, columns) => {
    if(row < 0 || column < 0 || row >= rows || column >= columns)
        return;

    if(map[row][column] === 0)
        pushing(emptyCell, row, column);
    else
        pushing(valuesCells, row, column);
}

const pushingCell = (map, emptyCell, valuesCells, row, column, rows, columns) => {
    pushCell(map, emptyCell, valuesCells, row, column, rows, columns);
    pushCell(map, emptyCell, valuesCells, row + 1, column - 1, rows, columns);
    pushCell(map, emptyCell, valuesCells, row + 1, column, rows, columns);
    pushCell(map, emptyCell, valuesCells, row + 1, column + 1, rows, columns);

    pushCell(map, emptyCell, valuesCells, row, column - 1, rows, columns);
    pushCell(map, emptyCell, valuesCells, row, column + 1, rows, columns);

    pushCell(map, emptyCell, valuesCells, row - 1, column - 1, rows, columns);
    pushCell(map, emptyCell, valuesCells, row - 1, column, rows, columns);
    pushCell(map, emptyCell, valuesCells, row - 1, column + 1, rows, columns);
}

export function clickEmptyCell(map, row, column, difficulty) {
    const emptyCell = [];
    const valuesCells = [];

    pushingCell(map, emptyCell, valuesCells, row, column, difficulty.rows, difficulty.columns);

    if(emptyCell.length > 1) {
        for(let i = 1; i < emptyCell.length; i++)
            pushingCell(map, emptyCell, valuesCells, emptyCell[i].row, emptyCell[i].column, difficulty.rows, difficulty.columns);
    }

    return {emptyCell, valuesCells};
}