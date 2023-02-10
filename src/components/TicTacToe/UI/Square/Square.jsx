import React from 'react';
import classes from "./square.module.css";

const Square = (props) => {
    return (
        <button {...props} className={classes.square} onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Square;