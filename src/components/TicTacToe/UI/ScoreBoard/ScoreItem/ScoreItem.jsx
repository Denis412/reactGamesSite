import React from 'react';
import classes from "./ScoreItem.module.css";

const ScoreItem = (props) => {
    return (
        <div {...props} className={classes.scoreItem}>
            {props.id}. Победитель - {props.name}
        </div>
    );
};

export default ScoreItem;