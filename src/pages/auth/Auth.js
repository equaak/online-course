import { observer } from 'mobx-react-lite';
import logo from '../../components/layout/logo.svg';
import './Auth.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Checkbox from '../../components/checkbox/Checkbox';
import PasswordInput from '../../components/password-input/PasswordInput';
import { useState } from 'react';
import axios from 'axios';
import userStore from '../../store/UserStore';
import { jwtDecode } from 'jwt-decode';

const Auth = observer(() => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [agree, setAgree] = useState(false);

    const {option} = useParams();

    const handleRemember = (option) => {
        setRememberMe(option);
    }

    const handleAgree = (option) => {
        setAgree(option);
    }

    const handleFirstname = (e) => {
        setFirstName(e.target.value);
    }

    const handleLastname = (e) => {
        setLastName(e.target.value);
    }

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleUsername = (e) => {
        setUsername(e.target.value);
    }

    const handlePassword = (password) => {
        setPassword(password);
    }

    const handleConfirmPassword = (confirmPassword) => {
        setConfirmPassword(confirmPassword);
    }

    const handleBoth = (e) => {
        setEmailOrUsername(e.target.value);
    }

    const handleLogin = async () => {
        console.log(password, email)
        const response = await axios.post('http://localhost:5000/auth/login', {email: email, password: password, userName: ''}); 
        
        localStorage.setItem('token', response.data);
        const user = jwtDecode(response.data);
        userStore.setUser(user.data);
        navigate('/');
    }

    const handleSignUp = async () => {
        const response = await axios.post('http://localhost:5000/auth/signup', {email: email, password: password, firstName: firstName, lastName: lastName, userName: userName})

        localStorage.setItem('token', response.data);
        const user = jwtDecode(response.data);
        userStore.setUser(user.data);
        navigate('/');
    }

    return(
        <main>
            <div className='auth-header'>
                <div className='standart-wrapper between-center'>
                    <Link to='/'>                    
                        <div className='auth-logo between-center'>      
                            <img src={logo} />
                            <p className='main-headerTitle'>E-tutor</p>
                        </div>
                    </Link>
                    
                    <div className='between-center'>
                        {option === 'sign-up' ? <p className='auth-text'>Already registered?</p> : <p className='auth-text'>Don't have account?</p>}
                        {option === 'sign-up' ? <Link to='/auth/sign-in'><button className='main-button orange'>Sign In</button></Link> : <Link to='/auth/sign-up'><button className='main-button white'>Create account</button></Link>}                        
                    </div>
                </div>

            </div>
            <div className='auth-content tiny-wrapper'>
                <p className='auth-title'>{option === 'sign-up' ? 'Create your account' : 'Sign in to your account'}</p>
                {option === 'sign-up' ? 
                    <div className='auth-form'>
                        <div className='between-center'>
                            <div className='auth-part'>
                                <p className='part-title'>First name</p>
                                <input type='text' className='part-input' value={firstName} onChange={handleFirstname} placeholder='First name...'/>
                            </div>
                            <div className='auth-part'>
                                <p className='part-title'>Last name</p>
                                <input type='text' className='part-input' value={lastName} onChange={handleLastname} placeholder='Last name...'/>
                            </div>
                        </div>
                        <div className='auth-part'>
                            <p className='part-title'>Username</p>
                            <input type='text' className='part-input' value={userName} onChange={handleUsername} placeholder='Username...'/>
                        </div>
                        <div className='auth-part'>
                            <p className='part-title'>Email</p>
                            <input type='text' className='part-input' value={email} onChange={handleEmail} placeholder='Email address...'/>
                        </div>
                        <div className='between-center'>
                            <div className='auth-part'>
                                <p className='part-title'>Password</p>
                                <PasswordInput handleChange={handlePassword} placeholder='Create Password'/>
                            </div>
                            <div className='auth-part'>
                                <p className='part-title'>Confirm Password</p>
                                <PasswordInput handleChange={handleConfirmPassword} placeholder='Confirm Password'/>
                            </div>
                        </div>
                        <div className='between-center'>
                            <div className='terms between-center'>
                                <Checkbox onClick={handleAgree} />
                                <p className='terms-text'>I Agree with all <span>Terms & Conditions</span></p>
                            </div>

                            <button onClick={handleSignUp} className='main-button orange'>Create Account</button>
                        </div>
                    </div>
                    :
                    <div className='auth-form'>
                        <div className='auth-part'>
                            <p className='part-title'>Email</p>
                            <input type='text' value={email} onChange={handleEmail} className='part-input' placeholder='Username or email address...'/>
                        </div>
                        <div className='auth-part'>
                            <p className='part-title'>Password</p>
                            <PasswordInput placeholder={'Password'} handleChange={handlePassword}/>
                        </div>

                        <div className='between-center'>
                            <div className='terms between-center'>
                                <Checkbox onClick={handleRemember} />
                                <p className='terms-text'>Remember me</p>
                            </div>

                            <button onClick={handleLogin} className='main-button orange'>Sign in</button>
                        </div>
                    </div>    
                }
            </div>
        </main>
    )
});

export default Auth;