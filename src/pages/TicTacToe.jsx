import React from 'react';
import GameTicTacToe from "../components/TicTacToe/GameTicTacToe";

const TicTacToe = () => {
    return (
        <section>
            <div className="game-header">
                <h1>Крестики-Нолики</h1>
            </div>
            <GameTicTacToe />
        </section>
    );
};

export default TicTacToe;