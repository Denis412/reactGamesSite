import React from 'react';
import classes from "./ClearScoreBoardButton.module.css";

const ClearScoreBoardButton = (props) => {
    return (
        <button {...props} className={classes.clearBtn}>
            Очистить доску победителей
        </button>
    );
};

export default ClearScoreBoardButton;