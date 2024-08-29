import { observer } from 'mobx-react-lite';
import './Layout.css';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';
import Maindropdown from '../main-dropdown/Main-Dropdown';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import Notification from '../notification/Notification';

import bell from './Bell.svg';
import heart from './Heart.svg';
import shopping from './ShoppingCartSimple.svg';
import logo from './logo.svg';
import search from './search.svg';
import icon from './UserCircle.svg';

import userStore from '../../store/UserStore';
import axios from 'axios';

const Layout = observer(() => {
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const decodedToken = jwtDecode(localStorage.getItem('token'));
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime && userStore.onceClose === false) {
                handleShow();
            } else {
                handleLogin();
            }
        }
    }, []);

    const handleShow = () => {
        setShow(true);
        localStorage.removeItem('token');
    }

    const handleLogin = async () => {
        setShow(false);
        setLogin(true);
        userStore.setOnClosed();
        const userData = jwtDecode(localStorage.getItem('token')).data;
        const responce = await axios.get('http://localhost:5000/user/get-profile?email=' + userData.email) 
        userStore.setUser(responce.data);
    }

    const handleClose = () => {
        setShow(false);
        userStore.setOnClosed();
        navigate('/');
    }

    const handleSelect = (option) => {
        console.log(option);
    }

    // const profileImageUrl = userStore.user.pfp || icon;

    return (
        <main>
            <Notification message={'Login time expired. Login!'} show={show} onClose={handleClose}/>
            <header>
                <div className='wide-wrapper between-center'>
                    <div className='headers between-center'>
                        <Link to='/' className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                        <Link to='/courses' className={location.pathname === '/courses' ? 'active' : ''}>Courses</Link>
                        <Link to='/about' className={location.pathname === '/about' ? 'active' : ''}>About</Link>
                        <Link to='/contact' className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
                        <Link to='/becomeInstuctor' className={location.pathname === '/becomeInstuctor' ? 'active' : ''}>Become an Instructor</Link>
                    </div>

                    <div className='dropdowns between-center'>
                        <Dropdown label={'USD'} options={['USD', 'KZT', 'RUS', 'JPY', 'EUR']} onSelect={handleSelect} />
                        <Dropdown label={'English'} options={['English', 'Russian']} onSelect={handleSelect} />
                    </div>
                </div>
            </header>
            <div className='main-header'>
                <div className='wide-wrapper between-center'>
                    <div className='main-headerLeft between-center'>
                        <Link to='/' className='between-center'>
                            <img src={logo} alt="Logo" />
                            <p className='main-headerTitle'>E-tutor</p>
                        </Link>
                        <Maindropdown label={'Browse'} options={['Technology & IT', 'Business & Finance', 'Creative Arts & Design', 'Personal Development', 'Health & Wellness', 'Language Learning', 'Science & Engineering', 'Lifestyle & Hobbies']} />
                        <div className='search'>
                            <img src={search} alt="Search" />
                            <input placeholder='What do you want to learn...'/>
                        </div>
                    </div>

                    <div className='main-headerRight between-center'>
                        <div className='main-clickables'>
                            <Link to=''><img src={bell} alt="Notifications" /></Link>
                            <Link to=''><img src={heart} alt="Favorites" /></Link>
                            <Link to=''><img src={shopping} alt="Cart" /></Link>
                        </div>
                        {userStore?.user?.pfp === undefined ?
                            <>
                                <Link to='/auth/sign-up'>
                                    <button className='main-button white'>Create Account</button>
                                </Link>
                                <Link to='/auth/sign-in'>
                                    <button className='main-button orange'>Sign in</button>
                                </Link>
                            </>
                            : 
                            <Link to='/profile/settings'>
                                <img className='pfp-icon' src={userStore.user?.pfp ? userStore.user.pfp : icon} alt="Profile" />
                            </Link>
                        }
                    </div>
                </div>
            </div>

            <Outlet />

            <footer></footer>
        </main>
    )
});

export default Layout;
