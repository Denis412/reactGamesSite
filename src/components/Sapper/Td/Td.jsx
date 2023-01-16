import React, {useEffect} from 'react';
import Cell from "../Cell/Cell";

const Td = ({clickOnCell, position, mass}) => {
    // useEffect(() => {
    //     console.log("ty")
    // }, [mass]);

    return (
        <td>
            <Cell onClick={clickOnCell} position={position}/>
        </td>
    );
};

export default Td;