import React, {useEffect, useMemo, useState} from 'react';
import Cell from "../Cell/Cell";
import cl from "./GameFieldSapper.module.css"
import {spawnMap} from "../scripts/spawnMap";
import {click} from "@testing-library/user-event/dist/click";
import Td from "../Td/Td";
import TableHeader from "../GameFieldTable/TableHeader/TableHeader";
import TableBody from "../GameFieldTable/TableBody/TableBody";

const GameFieldSapper = ({difficulty}) => {
    const [table, setTable] = useState([]);
    const [counterDifficultyChanges, setCounterDifficultyChanges] = useState(1);
    const [allSpaces, setAllSpaces] = useState({emptyCells: [], valueCells: []});
    const [currentBombs, setCurrentBombs] = useState(difficulty.bombs);
    const [loose, setLoose] = useState(false);

    useEffect(() => {
        const tmpTable = new Array(difficulty.rows);

        for(let i = 0; i < tmpTable.length; i++) {
            tmpTable[i] = new Array(difficulty.columns);

            for(let j = 0; j < tmpTable[i].length; j++) {
                tmpTable[i][j] = {
                    key: (i + j),
                    clickOnCell: clickOnCell,
                    position: {row: i, column: j}
                };
            }
        }

        setTable(tmpTable);
        setCurrentBombs(difficulty.bombs);
        setCounterDifficultyChanges(prev => prev + 1);
        setLoose(false);
    }, [difficulty]);

    const map = useMemo(() => {
        return spawnMap(difficulty.rows, difficulty.columns, difficulty.bombs);
    }, [difficulty]);

    function clickOnCell(row, column) {
        if(map[row][column] === 0) {
            setAllSpaces(clickEmptyCell(row, column));
            return "";
        }

        if(map[row][column] === 10) {
            setCurrentBombs(prev => prev - 1);
            setLoose(true);
        }

        return map[row][column];
    }



    const pushing = (cells, row, column) => {
        for(let i = 0; i < cells.length; i++) {
            if(cells[i]?.row === row && cells[i]?.column === column)
                return;
        }
        cells.push({row, column});
    }

    const pushCells = (emptyCells, valueCells, row, column) => {
        if(row < 0 || column < 0 || row >= difficulty.rows || column >= difficulty.columns)
            return;

        if(map[row][column] === 0)
            pushing(emptyCells, row, column);
        else
            pushing(valueCells, row, column);
    }

    const pushingCell = (emptyCells, valueCells, row, column) => {
        pushCells(emptyCells, valueCells, row, column);
        pushCells(emptyCells, valueCells, row + 1, column - 1);
        pushCells(emptyCells, valueCells, row + 1, column);
        pushCells(emptyCells, valueCells, row + 1, column + 1);

        pushCells(emptyCells, valueCells, row, column - 1);
        pushCells(emptyCells, valueCells, row, column + 1);

        pushCells(emptyCells, valueCells, row - 1, column - 1);
        pushCells(emptyCells, valueCells, row - 1, column);
        pushCells(emptyCells, valueCells, row - 1, column + 1);
    }

    function clickEmptyCell(row, column) {
        const emptyCells = [];
        const valueCells = [];

        pushingCell(emptyCells, valueCells, row, column);

        if(emptyCells.length > 1) {
            for(let i = 1; i < emptyCells.length; i++)
                pushingCell(emptyCells, valueCells, emptyCells[i].row, emptyCells[i].column);
        }

        return {emptyCells, valueCells};
    }

    return (
        <div className={cl.tableContainer}>
            <table className={cl.table}>
                <TableHeader currentBombs={currentBombs}/>
                <TableBody
                    table={table}
                    counterDifficultyChanges={counterDifficultyChanges}
                    allSpaces={allSpaces}
                    gameOver={loose}
                    setCurrentBombs={setCurrentBombs}
                />
            </table>
            {loose && <h1 style={{position: "absolute", top: "50%", textAlign: "center", color: "red", fontSize: "100px"}}>Игра окончена! Ты проиграл!</h1>}
        </div>
    );
};

export default GameFieldSapper;