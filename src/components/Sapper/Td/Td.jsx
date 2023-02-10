import React, {useEffect} from 'react';
import Cell from "../Cell/Cell";

const Td = ({clickOnCell, position, cellOpening, gameOver, setCurrentBombs, openSpaces}) => {
    // React.PureComponent делает поверхностное сранение новых и старых пропсов, а также нового и старого состояния. Если они изменяются, то компоненты, использующие их перерендерятся
    return (
        <td>
            <Cell
                onClick={clickOnCell}
                setCurrentBombs={setCurrentBombs}
                position={position}
                cellOpening={cellOpening}
                gameOver={gameOver}
                openSpaces={openSpaces}
            />
        </td>
    );
};

export default Td;