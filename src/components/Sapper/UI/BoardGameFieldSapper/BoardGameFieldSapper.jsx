import React, {useEffect, useMemo, useState} from 'react';
import Cell from "../Cell/Cell";
import cl from "./BoardGameFieldSapper.module.css"
import {findByLabelText} from "@testing-library/react";

const BoardGameFieldSapper = ({columns, rows, spawnBombs, setGameOver, gameOver, pointerEvents}) => {
    const [showAllValues, setShowAllValues] = useState(!gameOver);
    const bombsArray = spawnBombs[0];
    const countersArray = spawnBombs[1];

    const table = useMemo(() => {
        console.log("gh")
        const tmp = new Array(rows);

        for(let i = 0; i < tmp.length; i++) {
            tmp[i] = new Array(columns);
        }
        return tmp;
    }, [rows, columns]);

    const handleOnCellClick = (position) => {
        if(bombsArray[position[0]][position[1]]) {
            console.log("Game Over!");
            setShowAllValues(true);
            setGameOver(true);
            return bombsArray[position[0]][position[1]]
        }
        else if(countersArray[position[0]][position[1]]){
            return countersArray[position[0]][position[1]];
        }
        return false;
    }

    const renderCells = (row) => {
        for(let i = 0 ; i < columns; i++) {
            table[row][i] = (
                <Cell
                    key={i}
                    position={[row, i]}
                    value={bombsArray[row][i] ? "b" : countersArray[row][i]}
                    onClick={handleOnCellClick}
                />
            );
        }
        return table[row];
    }

    const renderTable = useMemo(() => {
        console.log("gh")
        for(let i = 0; i < rows; i++) {
            table[i] = (
                <div className={cl.row} key={i}>
                    {renderCells(i)}
                </div>
            );
        }
        return table;
    }, [rows, columns]);

    return (
        <div className={cl.mainTable} style={{
            width: `${columns * 30}px`,
            height: `${rows * 30}px`,
            pointerEvents: pointerEvents,
        }}>
            {renderTable}
            {gameOver && <h1 className={cl.gameOver}>Game Over! You loosed</h1>}
        </div>
    );
};

export default BoardGameFieldSapper;