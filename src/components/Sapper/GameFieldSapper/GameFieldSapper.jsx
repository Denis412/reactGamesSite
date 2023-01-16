import React, {useEffect, useMemo, useState} from 'react';
import Cell from "../Cell/Cell";
import cl from "./GameFieldSapper.module.css"
import {spawnMap} from "../scripts/spawnMap";
import {click} from "@testing-library/user-event/dist/click";
import Td from "../Td/Td";

const GameFieldSapper = ({difficulty}) => {
    const [table, setTable] = useState([]);
    const [counterDifficultyChanges, setCounterDifficultyChanges] = useState(1);
    const [mass, setMass] = useState([]);

    useEffect(() => {
        const tmpTable = new Array(difficulty.rows);

        for(let i = 0; i < tmpTable.length; i++) {
            tmpTable[i] = new Array(difficulty.columns);

            for(let j = 0; j < tmpTable[i].length; j++) {
                tmpTable[i][j] = (
                    <Td key={i + j}
                        mass={mass}
                        clickOnCell={clickOnCell}
                        position={{row: i, column: j}}
                    />
                );
            }
        }
        setTable(tmpTable);
        setCounterDifficultyChanges(prev => prev + 1);
    }, [difficulty]);

    const map = useMemo(() => {
        return spawnMap(difficulty.rows, difficulty.columns, difficulty.bombs);
    }, [difficulty]);

    function clickOnCell(row, column) {
        if(map[row][column] === 0) {
            let y = clickFillSpace(row, column);
            setMass(y);
            console.log(mass)
            console.log(y)
            return "";
        }

        if(map[row][column] === 10)
            console.log("Game Over!");

        return map[row][column];
    }

    const checkFillSpace = (row, column) => {
        if(row < 0 || row >= difficulty.rows || column < 0 || column >= difficulty.columns)
            return;

        return map[row][column] === 0;
    }

    const p = (arr, row, column) => {
        for(let i = 0; i < arr.length; i++) {
            if(arr[i]?.row === row && arr[i]?.column === column)
                return;
        }
        arr.push({row, column});
    }
    const pushArr = (arr, arr2, row, column) => {
        if(row < 0 || column < 0 || row >= difficulty.rows || column >= difficulty.columns)
            return;

        if(checkFillSpace(row, column))
            p(arr, row, column);
        else
            p(arr2, row, column);
    }

    const pushing = (space, notSpace, row, column) => {
        pushArr(space, notSpace, row, column);
        pushArr(space, notSpace, row + 1, column - 1);
        pushArr(space, notSpace, row + 1, column);
        pushArr(space, notSpace, row + 1, column + 1);

        pushArr(space, notSpace, row, column - 1);
        pushArr(space, notSpace, row, column + 1);

        pushArr(space, notSpace, row - 1, column - 1);
        pushArr(space, notSpace, row - 1, column);
        pushArr(space, notSpace, row - 1, column + 1);
    }

    function clickFillSpace(row, column, spaceCell = [], notCell = []) {
        const spaceCells = spaceCell;
        const notSpace = notCell;

        pushing(spaceCells, notSpace, row, column);

        if(spaceCell.length > 1) {
            for(let i = 1; i < spaceCell.length; i++)
                pushing(spaceCells, notSpace, spaceCell[i].row, spaceCell[i].column);
        }

        return [spaceCells, notSpace];
    }

    return (
        <table className={cl.table}>
            <tbody>
                {table.map((value, index) =>
                    <tr key={index + counterDifficultyChanges * 10}>{value}</tr>
                )}
            </tbody>
        </table>
    );
};

export default GameFieldSapper;