import React, {useMemo, useState} from 'react';
import HeaderGameFieldSapper from "../UI/HeaderGameFieldSapper";
import BoardGameFieldSapper from "../UI/BoardGameFieldSapper/BoardGameFieldSapper";
import Difficulties from "../Difficulties";
import cl from "./GameFieldSapper.module.css"
import {spawnMap} from "../scripts/spawnMap";

const GameFieldSapper = () => {
    const [difficulty, setDifficulty] = useState(
        {id: 0, title: "", columns: 0, rows: 0, bombs: 0, active: true}
    );
    const [gameOver, setGameOver] = useState(false);

    const bombsAndCounters = useMemo(() => {
        return spawnMap(difficulty);
    }, [difficulty]); //Создаем карту с бомбами и цифрами

    const setDifficultyGame = (diff) => {
        setDifficulty(diff);
        setGameOver(false);
    }

    return (
        <div className={cl.mainContainer}>
            <Difficulties setDifficultyGame={setDifficultyGame}/>
            <div className={cl.playingFieldContainer}>
                <HeaderGameFieldSapper difficultyGame={difficulty}/>
                <BoardGameFieldSapper
                    pointerEvents = {gameOver ? "none" : "auto"}
                    spawnBombs={bombsAndCounters}
                    columns={difficulty.columns}
                    rows={difficulty.rows}
                    gameOver={gameOver}
                    setGameOver={setGameOver}
                />
            </div>
        </div>
    );
};

export default GameFieldSapper;