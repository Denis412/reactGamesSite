import React, {useEffect, useMemo, useState} from 'react';
import cl from "./Cell.module.css"
import imgBomb from "../../../assets/images/bomb.png"
import imgFlag from "../../../assets/images/flag.png"
import ImageSapper from "../ImageSapper";

const Cell = ({onClick, position, allSpaces, gameOver, setCurrentBombs}) => {
    const [show, setShow] = useState();
    const [disabledCell, setDisabledCell] = useState(false);
    const [activeCell, setActiveCell] = useState(false);

    const [colorCell, setColorCell] = useState("blue");

    // useEffect(() => {
    //     clickHandler();
    // }, []);

    useEffect(() => {
        if(allSpaces?.emptyCells?.find(cell => cell.row === position.row && cell.column === position.column) ||
           allSpaces?.valueCells?.find((cell) => cell.row === position.row && cell.column === position.column)) {
            clickHandler();
        }
    }, [allSpaces]);

    const onContextMenuHandler = (e) => {
        e.preventDefault();

        if(show === 11) {
            setShow("");
            setCurrentBombs(prev => prev + 1)
        }
        else if(show === undefined || show === "") {
            setShow(11);
            setCurrentBombs(prev => prev - 1);
        }
    }
    const clickHandler = () => {
        if(show === 11)
            return;

        const value = onClick(position.row, position.column);
        setShow(value);

        if(value === 1) setColorCell("blue");
        else if(value === 2) setColorCell("green");
        else if(value === 3) setColorCell("red");
        else if(value === 4) setColorCell("darkblue");
        else if(value === 5) setColorCell("darkred");
        else if(value === 6) setColorCell("mediumaquamarine");
        else if(value === 10) setColorCell("black");

        if(value === "" || value === undefined)
            setDisabledCell(true);

        setActiveCell(true);
    }

    return (
        <button
            disabled={disabledCell}
            style={{width: "30px", height: "30px", pointerEvents: gameOver ? "none" : "auto", color: colorCell}}
            className={activeCell ? [cl.cell, cl.activeCell].join(' ') : cl.cell}
            onClick={() => clickHandler()}
            onContextMenu={(e) => onContextMenuHandler(e)}
        >
            {show === 10
                ? <ImageSapper imageSource={imgBomb}/>
                : show === 11
                    ? <ImageSapper imageSource={imgFlag}/>
                    : show}
        </button>
    );
};

export default Cell;