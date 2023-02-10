import React, {useState} from 'react';
import Square from "../Square/Square";

import classes from "./board.module.css";

const Board = (props) => {
    const winnerLines = [
        [0, 1, 2], [3, 4, 5],
        [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    const [step, setStep] = useState(1);

    const renderSquare = (index) => {
        return (
            <Square
                onClick={() => handleClick(index)}
                value={props.values[index].value}
                disabled={props.values[index].disable}
            />
        );
    }

    function handleClick(index) {
        props.updateValues((step % 2 === 0 ? 'О' : 'Х'), index, checkWin)
            ? setStep(1)
            : setStep(prev => prev + 1);

        console.log(step)
    }
    function checkWin(squares) {
        for(let i = 0; i < winnerLines.length; i++) {
            const [a, b, c] = winnerLines[i];

            if(squares[a].value) {
                if(squares[a].value === squares[b].value && squares[a].value === squares[c].value) {
                    props.updateWinner(squares[a].value);
                    return squares[a].value;
                }
            }
        }
        return null;
    }

    return (
        <div className={classes.board}>
            <h1 className={classes.header}>
                Текущий ход: {step % 2 === 0 ? 'О' : 'Х'}
            </h1>
            <div className={classes.row}>
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className={classes.row}>
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className={classes.row}>
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
};

export default Board;