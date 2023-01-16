import React, {useState} from 'react';
import Difficulties from "../components/Sapper/Difficulties";
import GameFieldSapper from "../components/Sapper/GameFieldSapper/GameFieldSapper";

const Sapper = () => {
    const [difficulty, setDifficulty] = useState(
        {id: 1, title: "Новичок",      columns: 9,  rows: 9,  bombs: 10, active: true}
    );

    const setDifficultyGame = (difficulty) => {
        setDifficulty(difficulty);
    }

    return (
        <section>
            <div className="game-header">
                <h1>Сапер</h1>
            </div>
            <Difficulties setDifficultyGame={setDifficultyGame}/>
            <GameFieldSapper difficulty={difficulty}/>
        </section>
    );
};

export default Sapper;