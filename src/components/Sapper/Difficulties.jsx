import React, {useMemo, useState} from 'react';
import cl from "../../styles/Sapper/mainStyles.module.css"
import DifficultyItem from "./UI/DifficultyItem";

const Difficulties = ({setDifficultyGame}) => {
    const [difficulties, setDifficulties] = useState([
        {id: 1, title: "Новичок",      columns: 9,  rows: 9,  bombs: 10, active: true},
        {id: 2, title: "Любитель",     columns: 16, rows: 16, bombs: 40, active: false},
        {id: 3, title: "Профессионал", columns: 32, rows: 16, bombs: 99, active: false},
        {id: 4, title: "Особый",       columns: 9,  rows: 9,  bombs: 10, active: false},
    ]);
    let activeDifficultyIndex = useMemo(() => {
        return difficulties.findIndex(
                difficulty => difficulty.active === true
            );
    }, [difficulties]);

    const onClickHandle = (index) => {
        let tmpDifficulties = difficulties.slice();

        tmpDifficulties[activeDifficultyIndex].active = false;
        tmpDifficulties[index].active = true;
        setDifficultyGame(tmpDifficulties[index]);

        setDifficulties(tmpDifficulties);
    }

    return (
        <div className={cl.difficulties}>
            {difficulties.map((difficulty, index) =>
                <DifficultyItem
                    key={difficulty.id}
                    setActiveDifficulty={onClickHandle}
                    index={index}
                    active={difficulty.active}
                    title={difficulty.title}
                />
            )}
        </div>
    );
};

export default Difficulties;