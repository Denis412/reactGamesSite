import React, {useEffect, useMemo, useState} from 'react';
import cl from "./Cell.module.css"

const Cell = ({value, flag, position, onClick, onDoubleClick}) => {
    const [showValue, setShowValue] = useState(false);

    return (
        <div onDoubleClick={() => setShowValue(onDoubleClick())} onClick={() => setShowValue(onClick(position))} className={cl.cell}>
            {showValue ? value : ""}
        </div>
    );
};

export default Cell;