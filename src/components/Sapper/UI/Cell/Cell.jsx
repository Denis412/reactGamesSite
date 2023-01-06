import React, {useEffect, useMemo, useState} from 'react';
import cl from "./Cell.module.css"

const Cell = ({value, position, onClick}) => {
    const [showValue, setShowValue] = useState(false);

    const handleClick = () => {
        setShowValue(onClick(position));
    }
    
    return (
        <div onClick={() => handleClick()} className={cl.cell}>
            {showValue ? value : ""}
        </div>
    );
};

export default Cell;