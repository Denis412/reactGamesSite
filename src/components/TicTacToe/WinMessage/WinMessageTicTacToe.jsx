import React from 'react';
import classes from "./WinMessame.module.css";

const WinMessageTicTacToe = (props) => {
    return (
        <div
            style={{display: props.winner ? "block" : "none"}}
            className={classes.win}
        >
            Победил игрок: {props.winner}
        </div>
    );
};

export default WinMessageTicTacToe;