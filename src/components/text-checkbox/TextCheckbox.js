import { useState, useEffect } from "react"
import yes from '../checkbox/yes.svg';
import './TextCheckbox.css';


const TextCheckbox = ({onClick, text}) => {
    const [active, setActive] = useState(false);


    const handleActive = () => {
        setActive(prev => !prev);
    }

    useEffect(() => {
        onClick(active);
    }, [active]);


    return(
        <div className="textbox-container" onClick={handleActive}>
            <div className={active ? 'checkbox active' : 'checkbox'}>
                {active && <img src={yes} />}
            </div>
            <p className={!active ? 'body-m400 color-gray-600' : 'body-m400 color-gray-900'}>{text}</p>
        </div>
    )
}

export default TextCheckbox;