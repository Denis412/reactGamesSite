import React from 'react';
import classes from "./RestartGameButton.module.css";

const RestartGameButton = (props) => {
    return (
        <button {...props} className={classes.btn}>
            Новая игра
        </button>
    );
};

export default RestartGameButton;