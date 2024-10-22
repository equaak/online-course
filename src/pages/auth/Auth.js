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
import Notification from '../../components/notification/Notification';



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
    const [show, setShow] = useState(undefined);
    const [message, setMessage] = useState('');

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

    const handleLogin = async () => {
        try{
            const response = await axios.post('http://localhost:5000/auth/login', {email: email, password: password, userName: '', remember: rememberMe}); 
            

            if(rememberMe){
                localStorage.setItem('token', response.data);
                const user = jwtDecode(response.data);
                userStore.setUser(user.protected_user);
            }
            else{
                
                userStore.setUserObject(response.data);
            }
            navigate('/');
        }
        catch(err){
            console.log(err);
            if(err.response?.data.message === 'Invalid'){
                setShow(true);
                setMessage('Incorrect email or/and password. Please try again');
            }
        }
        
    }

    const handleSignUp = async () => {
        const response = await axios.post('http://localhost:5000/auth/signup', {email: email, password: password, firstName: firstName, lastName: lastName, userName: userName})

        localStorage.setItem('token', response.data);
        const user = jwtDecode(response.data);
        userStore.setUser(user.protected_user);
        navigate('/');
    }


    const handleClose = () => {
        setShow(false);
        setMessage(undefined);
    }


    return(
        <main>
            <Notification message={message} show={show} onClose={handleClose}/>
            <div className='auth-header'>
                <div className='standart-wrapper between-center'>
                    <Link to='/'>                    
                        <div className='auth-logo between-center'>      
                            <img src={logo} />
                            <p className='main-headerTitle heading-03'>E-tutor</p>
                        </div>
                    </Link>
                    
                    <div className='between-center'>
                        {option === 'sign-up' ? <p className='auth-text body-m400'>Already registered?</p> : <p className='auth-text'>Don't have account?</p>}
                        {option === 'sign-up' ? <Link to='/auth/sign-in'><button className='button-secondary medium primary button-m'>Sign In</button></Link> : <Link to='/auth/sign-up'><button className='button-primary medium primary button-m'>Create account</button></Link>}                        
                    </div>
                </div>

            </div>
            <div className='auth-content tiny-wrapper'>
                <p className='auth-title heading-02'>{option === 'sign-up' ? 'Create your account' : 'Sign in to your account'}</p>
                {option === 'sign-up' ? 
                    <div className='auth-form'>
                        <div className='between-center'>
                            <div className='auth-part'>
                                <p className='part-title body-m400'>First name</p>
                                <input type='text' className='part-input body-l400' value={firstName} onChange={handleFirstname} placeholder='First name...'/>
                            </div>
                            <div className='auth-part'>
                                <p className='part-title body-m400'>Last name</p>
                                <input type='text' className='part-input body-l400' value={lastName} onChange={handleLastname} placeholder='Last name...'/>
                            </div>
                        </div>
                        <div className='auth-part'>
                            <p className='part-title body-m400'>Username</p>
                            <input type='text' className='part-input body-l400' value={userName} onChange={handleUsername} placeholder='Username...'/>
                        </div>
                        <div className='auth-part'>
                            <p className='part-title body-m400'>Email</p>
                            <input type='text' className='part-input body-l400' value={email} onChange={handleEmail} placeholder='Email address...'/>
                        </div>
                        <div className='between-center'>
                            <div className='auth-part'>
                                <p className='part-title body-m400'>Password</p>
                                <PasswordInput handleChange={handlePassword} placeholder='Create Password'/>
                            </div>
                            <div className='auth-part'>
                                <p className='part-title body-m400'>Confirm Password</p>
                                <PasswordInput handleChange={handleConfirmPassword} placeholder='Confirm Password'/>
                            </div>
                        </div>
                        <div className='between-center'>
                            <div className='terms between-center'>
                                <Checkbox onClick={handleAgree} />
                                <p className='terms-text body-m400'>I Agree with all <span>Terms & Conditions</span></p>
                            </div>

                            <button onClick={handleSignUp} className='button-primary medium primary button-m'>Create Account</button>
                        </div>
                    </div>
                    :
                    <div className='auth-form'>
                        <div className='auth-part'>
                            <p className='part-title body-m400'>Email</p>
                            <input type='text' value={email} onChange={handleEmail} className='part-input body-l400' placeholder='Username or email address...'/>
                        </div>
                        <div className='auth-part'>
                            <p className='part-title body-m400'>Password</p>
                            <PasswordInput placeholder={'Password'} handleChange={handlePassword}/>
                        </div>

                        <div className='between-center'>
                            <div className='terms between-center'>
                                <Checkbox onClick={handleRemember} />
                                <p className='terms-text body-m400'>Remember me</p>
                            </div>

                            <button onClick={handleLogin} className='button-primary medium primary button-m'>Sign in</button>
                        </div>
                    </div>    
                }
            </div>
        </main>
    )
});

export default Auth;