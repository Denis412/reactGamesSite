import React from 'react';
import cl from "./TableHeader.module.css"

const TableHeader = ({currentBombs}) => {
    return (
        <thead className={cl.tableHeader}>
            <span>{currentBombs}</span>
        </thead>
    );
};

export default TableHeader;