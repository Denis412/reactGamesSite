import React, {useMemo, useState} from 'react';
import HeaderGameFieldSapper from "../UI/HeaderGameFieldSapper";
import BoardGameFieldSapper from "../UI/BoardGameFieldSapper/BoardGameFieldSapper";
import Difficulties from "../Difficulties";
import cl from "./GameFieldSapper.module.css"
import difficulties from "../Difficulties";

const GameFieldSapper = () => {
    const [difficulty, setDifficulty] = useState(
        {id: 0, title: "", columns: 0, rows: 0, bombs: 0, active: true}
    );

    const countersFill = (counters, bombs, row, column) => {
        if(row < 0 || column < 0 || row >= bombs.length || column >= bombs[0].length)
            return 0;

        if(!bombs[row][column])
            counters[row][column] += 1;
        else
            counters[row][column] = 0;
    }

    const spawnBombsAndCounters = () => {
        const newTableBombs = new Array(difficulty.rows);
        const newTableCounters = new Array(difficulty.rows);

        for(let i = 0; i < newTableBombs.length; i++) {
            newTableBombs[i] = new Array(difficulty.columns).fill(false);
            newTableCounters[i] = new Array(difficulty.columns).fill(0);
        }

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

        return [newTableBombs, newTableCounters];
    }

    const bombsAndCounters = spawnBombsAndCounters();

    let showElement = useMemo(() => {return "";}, []);

    const setDifficultyGame = (diff) => {
        setDifficulty(diff);
    }

    return (
        <div className={cl.mainContainer}>
            <Difficulties setDifficultyGame={setDifficultyGame}/>
            <div className={cl.playingFieldContainer}>
                <HeaderGameFieldSapper difficultyGame={difficulty}/>
                <BoardGameFieldSapper
                    spawnBombs={bombsAndCounters}
                    columns={difficulty.columns}
                    rows={difficulty.rows}
                />
            </div>
        </div>
    );
};

export default GameFieldSapper;