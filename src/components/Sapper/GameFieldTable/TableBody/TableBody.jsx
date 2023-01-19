import React from 'react';
import Td from "../../Td/Td";

const TableBody = ({table, counterDifficultyChanges, allSpaces, gameOver, setCurrentBombs}) => {
    return (
        <tbody>
            {table.map((row, index) =>
                <tr key={index + counterDifficultyChanges * 10}>
                    {row.map(column =>
                        <Td key={column.key}
                            clickOnCell={column.clickOnCell}
                            position={column.position}
                            allSpaces={allSpaces}
                            gameOver={gameOver}
                            setCurrentBombs={setCurrentBombs}
                        />
                    )}
                </tr>
            )}
        </tbody>
    );
};

export default TableBody;