import { observer } from 'mobx-react-lite';
import './ProfileLayout.css';

import icon from '../../../components/layout/UserCircle.svg';
import arrow from '../../../pages/profile/settings/ArrowRight.svg';

import userStore from '../../../store/UserStore';
import { Link, Outlet, useLocation } from 'react-router-dom';

import axios from 'axios';

const ProfileLayout = observer(() => {
    const becomeInstructor = async () => {
        try{
            userStore.isInstructor = true;
            const response = await axios.post('http://localhost:5000/instructor/addInstructor', {biography: '', userId: userStore.user.userId});
            console.log(response.data);
        }
        catch (err){
            console.log(err.message);
        }
    }

    const location = useLocation();
    return(
        <main className='profile'>
            <div className='profile-header background-color-primary-100'>
                <div className='tiny-wrapper'>
                    <div className='profile-header-container background-color-gray-white between-center'>
                        <div className='profile-headerLeft between-center'>
                        <img className='profile-header-icon' src={userStore?.pfp ? userStore.pfp : icon} />
                            <div className='profile-headerInfo'>
                                <p className='profile-header-title color-gray-900 heading-04'>{userStore?.user?.firstName} {userStore?.user?.lastName}</p>
                                {userStore.user?.title === null ? '' : <p className='profile-header-subtitle color-gray-600 body-l400'>{userStore.user.title}</p>}
                            </div>
                        </div>
                        <button className='profile-header-button button-secondary primary medium button-m' onClick={becomeInstructor}>Become Instructor  <img src={arrow} /></button>
                    </div>
                </div>
            </div>
            <div className='profile-main'>
                <div className='tiny-wrapper'>
                    <div className='profile-main-header background-color-gray-white between-center'>
                        <Link to='/profile/dashboard' className={location.pathname === '/profile/dashboard' ? 'profile-main-header-link body-l500 active color-primary-500' : 'profile-main-header-link body-l500 color-gray-700'}>Dashboard</Link>
                        <Link to='/profile/courses' className={location.pathname === '/profile/courses' ? 'profile-main-header-link body-l500 active color-primary-500' : 'profile-main-header-link body-l500 color-gray-700'}>Courses</Link>
                        <Link to='/profile/teachers' className={location.pathname === '/profile/teachers' ? 'profile-main-header-link body-l500 active color-primary-500' : 'profile-main-header-link body-l500 color-gray-700'}>Teachers</Link>
                        <Link to='/profile/message' className={location.pathname === '/profile/message' ? 'profile-main-header-link body-l500 active color-primary-500' : 'profile-main-header-link body-l500 color-gray-700'}>Message</Link>
                        <Link to='/profile/wishlist' className={location.pathname === '/profile/wishlist' ? 'profile-main-header-link body-l500 active color-primary-500' : 'profile-main-header-link body-l500 color-gray-700'}>Wishlist</Link>
                        <Link to='/profile/history' className={location.pathname === '/profile/history' ? 'profile-main-header-link body-l500 active color-primary-500' : 'profile-main-header-link body-l500 color-gray-700'}>Purchase History</Link>
                        <Link to='/profile/settings' className={location.pathname === '/profile/settings' ? 'profile-main-header-link body-l500 active color-primary-500' : 'profile-main-header-link body-l500 color-gray-700'}>Settings</Link>
                    </div>
                </div>

                <Outlet />
            </div>
        </main>
    )
});

export default ProfileLayout;