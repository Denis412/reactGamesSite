import React, {useEffect} from 'react';
import Cell from "../Cell/Cell";

const Td = ({clickOnCell, position, allSpaces, gameOver, setCurrentBombs}) => {
    return (
        <td>
            <Cell
                onClick={clickOnCell}
                setCurrentBombs={setCurrentBombs}
                position={position}
                allSpaces={allSpaces}
                gameOver={gameOver}
            />
        </td>
    );
};

export default Td;