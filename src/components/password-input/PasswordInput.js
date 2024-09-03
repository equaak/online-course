import eye from './Eye.svg';
import eyeslash from './EyeSlash.svg';
import { useState, useEffect } from 'react';


const PasswordInput = ({handleChange, placeholder}) => {
    const [show, setShow] = useState(false);
    const [passwordValue, setPasswordValue] = useState('');

    useEffect(() => {
        handleChange(passwordValue);
    }, [passwordValue])

    const handleClick = () => {
        setShow(prev => !prev);
    }

    const onTextChange = (e) => {
        setPasswordValue(e.target.value);
    }

    return(
        <div className='password-container between-center part-input'>
            <input type={show ? 'text' : 'password'} placeholder={placeholder} className='password-input body-l400' value={passwordValue} onChange={onTextChange}/>
            <img src={show ? eye : eyeslash} onClick={handleClick}/>
        </div>
    )
}

export default PasswordInput;