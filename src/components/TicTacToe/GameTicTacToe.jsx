import React, {useState} from 'react';
import Board from "./UI/Board/Board";
import WinMessageTicTacToe from "./WinMessage/WinMessageTicTacToe";
import classes from "./Game.module.css";
import RestartGameButton from "./UI/Buttons/RestartGameButton/RestartGameButton";
import ScoreBoard from "./UI/ScoreBoard/ScoreBoard";
import ClearScoreBoardButton from "./UI/Buttons/ClearScoreBoardButton/ClearScoreBoardButton";

const GameTicTacToe = () => {
    const defaultValues = [
        {value: null, disable: false}, {value: null, disable: false}, {value: null, disable: false},
        {value: null, disable: false}, {value: null, disable: false}, {value: null, disable: false},
        {value: null, disable: false}, {value: null, disable: false}, {value: null, disable: false},
    ];

    const [winner, setWinner] = useState({
        name: '',
        id: 0,
    });
    const [values, setValues] = useState(defaultValues);
    const [winnersNames, setWinnersNames]   = useState(JSON.parse(localStorage.getItem("winners")) ?? []);
    const [winnersValues, setWinnersValues] = useState(JSON.parse(localStorage.getItem("values"))  ?? []);

    const updateWinner = (value) => {
        const newWinner = {
            name: value,
            id: winnersNames.length + 1,
        };

        localStorage.setItem("winners", JSON.stringify([
            ...winnersNames,
            newWinner
        ]));

        setWinner(newWinner);
        setWinnersNames([...winnersNames, newWinner]);
    }
    const updateValues = (value, index, checkWin) => {
        let newValues = [];

        for(let i = 0; i < values.length; i++) {
            newValues[i] = Object.assign({}, values[i]);
        }

        newValues[index].value = value;
        newValues[index].disable = true;

        setValues(newValues);

        let findWinner = checkWin(newValues);

        if(findWinner) {
            for(let i = 0; i < newValues.length; i++) {
                newValues[i].disable = true;
            }
            setWinnersValues(newValues);

            localStorage.setItem("values", JSON.stringify([
                ...(JSON.parse(localStorage.getItem("values")) ?? []),
                newValues
            ]));
        }
        return findWinner
    }
    const restartGame = () => {
        setWinner(null);
        setValues(defaultValues);
    }
    const loadValues = (index) => {
        const newWinner = JSON.parse(localStorage.getItem("winners"))[index];

        setWinner({
            name: newWinner.name,
            id: newWinner.id,
        });
        setValues(
            JSON.parse(localStorage.getItem("values"))[index],
        );
    }
    const clearScoreBoard = () => {
        setWinnersNames([]);
        setWinnersValues([]);

        localStorage.removeItem("winners");
        localStorage.removeItem("values");
    }

    return (
        <div className={classes.gameContainer}>
            <header className={classes.gameHeader}>
                <WinMessageTicTacToe
                    winner={winner?.name}
                />
            </header>
            <main className={classes.gameMain}>
                <div className={classes.leftSide}>
                    <RestartGameButton onClick={() => restartGame()}/>
                </div>
                <div>
                    <Board
                        values={values}
                        updateValues={updateValues}
                        updateWinner={updateWinner}
                    />
                </div>
                <div className={classes.rightSide}>
                    <ScoreBoard loadValues={loadValues} scoreList={winnersNames}/>
                    <ClearScoreBoardButton onClick={() => clearScoreBoard()}/>
                </div>
            </main>
        </div>
    )
}

export default GameTicTacToe;