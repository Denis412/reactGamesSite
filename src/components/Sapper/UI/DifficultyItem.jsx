import React from 'react';
import cl from "../../../styles/Sapper/mainStyles.module.css"

const DifficultyItem = ({setActiveDifficulty, title, index, active}) => {
    return (
        <span
            className={active
                ? [cl.difficultiesItem, cl.difficultiesItemActive].join(' ')
                : cl.difficultiesItem}
            onClick={() => setActiveDifficulty(index)}
        >
            {title}
        </span>
    );
};

export default DifficultyItem;