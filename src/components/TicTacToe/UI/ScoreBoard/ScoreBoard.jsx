import React, {useState} from 'react';
import ScoreItem from "./ScoreItem/ScoreItem";

const ScoreBoard = (props) => {
    return (
        <div>
            <h1>Доска победителей:</h1>
            {props.scoreList?.map((winner, index) =>
                <ScoreItem
                    onClick={() => props.loadValues(index)}
                    id={winner.id}
                    name={winner.name}
                    key={winner.id}
                />
            )}
        </div>
    );
};

export default ScoreBoard;