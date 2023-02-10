import React from 'react';
import Td from "../../Td/Td";

const TableBody = ({table, counterDifficultyChanges, cellOpening, gameOver, setCurrentBombs, setFlags, openSpaces}) => {
    return (
        <tbody>
            {table.map((row, index) =>
                <tr key={index + counterDifficultyChanges * 10}>
                    {row.map(column =>
                        <Td key={column.key}
                            clickOnCell={column.clickOnCell}
                            position={column.position}
                            cellOpening={cellOpening}
                            gameOver={gameOver}
                            setCurrentBombs={setCurrentBombs}
                            setFlags={setFlags}
                            openSpaces={openSpaces}
                        />
                    )}
                </tr>
            )}
        </tbody>
    );
};

export default TableBody;