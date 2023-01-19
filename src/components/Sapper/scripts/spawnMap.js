const checkFillSpace = (map, row, column) => {
    if(row < 0 || row >= map.length || column < 0 || column >= map[0].length)
        return;

    if(map[row][column] < 10)
        map[row][column] += 1;
}

export const spawnMap = (rows, columns, bombs) => {
    const map = new Array(rows);

    for(let i = 0; i < rows; i++)
        map[i] = new Array(columns).fill(0);

    for(let i = 0; i < bombs; i++) {
        let row = Math.round(Math.random() * (rows - 1));
        let column = Math.round(Math.random() * (columns - 1));

        while(map[row][column] === 10) {
            row = Math.round(Math.random() * (rows - 1));
            column = Math.round(Math.random() * (columns - 1));
        }

        map[row][column] = 10;

        checkFillSpace(map, row - 1, column - 1);
        checkFillSpace(map, row - 1, column);
        checkFillSpace(map, row - 1, column + 1);

        checkFillSpace(map, row, column - 1);
        checkFillSpace(map, row, column + 1);

        checkFillSpace(map, row + 1, column - 1);
        checkFillSpace(map, row + 1, column);
        checkFillSpace(map, row + 1, column + 1);
    }

    return map;
}