const countersFill = (counters, bombs, row, column) => { //Функция увеличения счетчиков полей с цифрами
    if(row < 0 || column < 0 || row >= bombs.length || column >= bombs[0].length)
        return 0;

    if(!bombs[row][column])
        counters[row][column] += 1;
    else
        counters[row][column] = 0;
}

export const spawnMap = (difficulty) => {
    //----------------Создание и инициализация массивов для хранения бомб и цифр---------------------
    const newTableBombs = new Array(difficulty.rows);
    const newTableCounters = new Array(difficulty.rows);

    console.log("spawn");

    for(let i = 0; i < newTableBombs.length; i++) {
        newTableBombs[i] = new Array(difficulty.columns).fill(false);
        newTableCounters[i] = new Array(difficulty.columns).fill(0);
    }
    //------------------------------------------------------------------------------------------------

    //---------------------------------Заполнение массивов бомб и цифр--------------------------------
    for (let i = 0; i < difficulty.bombs; i++) {
        let column = Math.round(Math.random() * (difficulty.columns - 1));
        let row = Math.round(Math.random() * (difficulty.rows - 1));

        while(newTableBombs[row][column] === true) {
            column = Math.round(Math.random() * (difficulty.columns - 1));
            row = Math.round(Math.random() * (difficulty.rows - 1));
        }
        newTableBombs[row][column] = true;

        countersFill(newTableCounters, newTableBombs, row - 1, column - 1);
        countersFill(newTableCounters, newTableBombs, row - 1, column);
        countersFill(newTableCounters, newTableBombs, row - 1, column + 1);
        countersFill(newTableCounters, newTableBombs, row, column - 1);
        countersFill(newTableCounters, newTableBombs, row, column + 1);
        countersFill(newTableCounters, newTableBombs, row + 1, column - 1);
        countersFill(newTableCounters, newTableBombs, row + 1, column);
        countersFill(newTableCounters, newTableBombs, row + 1, column + 1);
    }
    //------------------------------------------------------------------------------------------------

    return [newTableBombs, newTableCounters];
}