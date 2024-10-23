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

    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        const responce = await axios.get('http://localhost:5000/category/getCategories');
        const newArray = responce.data.map(obj => Object.values(obj)[1]);
        setCategories(newArray);
    }

    useEffect(() => {
        getCategories();
        if (localStorage.getItem('token')) {
            const decodedToken = jwtDecode(localStorage.getItem('token'));
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp < currentTime && userStore.onceClose === false) {
                handleShow();
            }
        }
    }, []);

    const handleShow = () => {
        setShow(true);
        localStorage.removeItem('token');
    }

    const handleClose = () => {
        setShow(false);
        userStore.setOnClosed();
        navigate('/');
    }

    const handleSelect = (option) => {
        console.log(option);
    }

    return (
        <main>
            <Notification message={'Login time expired. Login!'} show={show} onClose={handleClose}/>
            <header className='background-color-gray-900'>
                <div className='wide-wrapper between-center'>
                    <div className='headers between-center'>
                        <Link to='/' className={location.pathname === '/' ? 'active body-m500 color-gray-white' : 'body-m500 color-gray-500'}>Home</Link>
                        <Link to='/courses' className={location.pathname === '/courses' ? 'active body-m500 color-gray-white' : 'body-m500 color-gray-500'}>Courses</Link>
                        <Link to='/about' className={location.pathname === '/about' ? 'active body-m500 color-gray-white' : 'body-m500 color-gray-500'}>About</Link>
                        <Link to='/contact' className={location.pathname === '/contact' ? 'active body-m500 color-gray-white' : 'body-m500 color-gray-500'}>Contact</Link>
                        {userStore.isInstructor === false ? <Link to='/becomeInstuctor' className={location.pathname === '/becomeInstuctor' ? 'active body-m500 color-gray-white' : 'body-m500 color-gray-500'}>Become an Instructor</Link> : ""}

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
                            <p className='main-headerTitle heading-03 color-gray-900'>E-tutor</p>
                        </Link>
                        <Maindropdown label={'Browse'} options={categories} />
                        <div className='search'>
                            <img src={search} alt="Search" />
                            <input className='body-l400 color-gray-500' placeholder='What do you want to learn...'/>
                        </div>
                    </div>

                    <div className='main-headerRight between-center'>
                        <div className='main-clickables'>
                            <Link to=''><img src={bell} alt="Notifications" /></Link>
                            <Link to=''><img src={heart} alt="Favorites" /></Link>
                            <Link to=''><img src={shopping} alt="Cart" /></Link>
                        </div>
                        {userStore.user === null ?
                            <div className='layout-buttons between-center'>
                                <Link to='/auth/sign-up'>
                                    <button className='button-secondary medium primary button-m'>Create Account</button>
                                </Link>
                                <Link to='/auth/sign-in'>
                                    <button className='button-primary medium primary button-m'>Sign in</button>
                                </Link>
                            </div>
                            :
                            <Link to={userStore.isInstructor ? '/instructor/settings' : '/profile/dashboard'}>
                                <img className='pfp-icon' src={userStore?.pfp ? userStore.pfp : icon} alt="Profile" />
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
