import { useEffect, useState } from 'react';

import yes from './yes.svg';

import './Checkbox.css';


const Checkbox = ({onClick}) => {
    const [active, setActive] = useState(false);


    const handleActive = () => {
        setActive(prev => !prev);
    }

    useEffect(() => {
        onClick(active);
    }, [active])


    return(
        <div className={active ? 'checkbox active' : 'checkbox'} onClick={handleActive}>
            {active && <img src={yes} />}
        </div>
    )
}

export default Checkbox;