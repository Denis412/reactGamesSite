import React, {useEffect, useMemo, useState} from 'react';
import cl from "./GameFieldSapper.module.css"
import {spawnMap} from "../scripts/spawnMap";
import TableHeader from "../GameFieldTable/TableHeader/TableHeader";
import TableBody from "../GameFieldTable/TableBody/TableBody";
import {clickEmptyCell} from "../scripts/clickEmptyCell";

const GameFieldSapper = ({difficulty}) => {
    const [table, setTable] = useState([]);
    const [counterDifficultyChanges, setCounterDifficultyChanges] = useState(1);
    const [cellOpening, setCellOpening] = useState({emptyCells: [], valueCells: []});
    const [currentBombs, setCurrentBombs] = useState(difficulty.bombs);
    const [loose, setLoose] = useState(false);

    const [openSpace, setOpenSpaces] = useState(false);

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
            const activeCells = clickEmptyCell(map, row, column, difficulty.rows, difficulty.columns);

            setOpenSpaces(true);

            setCellOpening(activeCells);
            return "";
        }

        if(map[row][column] === 10) {
            setCurrentBombs(prev => prev - 1);
            setLoose(true);
        }
        // else {
        //     if(currentActiveCells?.find(cell => cell.row === row && cell.column === column)) {
        //
        //         setAllSpaces(clickEmptyCell(row, column));
        //         return map[row][column];
        //     }
        // }

        //console.log("1");
        setOpenSpaces(false);

        return map[row][column];
    }

    return (
        <div className={cl.tableContainer}>
            <table className={cl.table}>
                <TableHeader currentBombs={currentBombs}/>
                <TableBody
                    table={table}
                    counterDifficultyChanges={counterDifficultyChanges}
                    cellOpening={cellOpening}
                    gameOver={loose}
                    setCurrentBombs={setCurrentBombs}
                    openSpaces={openSpace}
                />
            </table>
            {loose && <h1 style={{position: "absolute", top: "50%", textAlign: "center", color: "red", fontSize: "100px"}}>Игра окончена! Ты проиграл!</h1>}
        </div>
    );
};

export default GameFieldSapper;