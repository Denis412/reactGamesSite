import React, {useEffect, useMemo, useState} from 'react';
import cl from "./Cell.module.css"

const Cell = ({onClick, position}) => {
    const [show, setShow] = useState();
    const [disabledCell, setDisabledCell] = useState(false);

    // useEffect(() => {
    //     setShow(onClick(position.row, position.column));
    // }, []);

    const clickHandler = () => {
        setShow(onClick(position.row, position.column));
        setDisabledCell(true);
    }

    return (
        <button
            disabled={disabledCell}
            style={{width: "30px", height: "30px"}}
            className={cl.cell}
            onClick={() => clickHandler()}
        >
            {show === 10 ? 'b' : show}
        </button>
    );
};

export default Cell;