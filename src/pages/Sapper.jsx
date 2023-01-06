import React from 'react';
import GameFieldSapper from "../components/Sapper/GameFieldSapper/GameFieldSapper";

const Sapper = () => {
    return (
        <section>
            <div className="game-header">
                <h1>Сапер</h1>
            </div>
            <GameFieldSapper />
        </section>
    );
};

export default Sapper;