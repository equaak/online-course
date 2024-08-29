import { observer } from 'mobx-react-lite';
import './ProfileLayout.css';

import icon from '../../../components/layout/UserCircle.svg';
import arrow from '../../../pages/profile/settings/ArrowRight.svg';

import userStore from '../../../store/UserStore';
import { Link, Outlet, useLocation } from 'react-router-dom';

const ProfileLayout = observer(() => {

    const location = useLocation();
    return(
        <main className='profile'>
            <div className='profile-header'>
                <div className='tiny-wrapper'>
                    <div className='profile-header-container between-center'>
                        <div className='profile-headerLeft between-center'>
                        <img className='profile-header-icon' src={userStore?.user?.pfp ? userStore.user.pfp : icon} /> 
                            <div className='profile-headerInfo'>
                                <p className='profile-header-title'>{userStore.user.firstName} {userStore.user.lastName}</p>
                                {userStore.user.title == null ? '' : <p className='profile-header-subtitle'>{userStore.user.title}</p>}
                            </div>
                        </div>
                        <button className='profile-header-button'>Become Instructor  <img src={arrow} /></button>
                    </div>
                </div>
            </div>
            <div className='profile-main'>
                {/* <input type='file' onChange={handleImage} />
                <img src={file} /> */}
                <div className='tiny-wrapper'>
                    <div className='profile-main-header between-center'>
                        <Link to='/profile/dashboard' className={location.pathname == '/profile/dashboard' ? 'profile-main-header-link active' : 'profile-main-header-link'}>Dashboard</Link>
                        <Link to='/profile/courses' className={location.pathname == '/profile/courses' ? 'profile-main-header-link active' : 'profile-main-header-link'}>Courses</Link>
                        <Link to='/profile/teachers' className={location.pathname == '/profile/teachers' ? 'profile-main-header-link active' : 'profile-main-header-link'}>Teachers</Link>
                        <Link to='/profile/message' className={location.pathname == '/profile/message' ? 'profile-main-header-link active' : 'profile-main-header-link'}>Message</Link>
                        <Link to='/profile/wishlist' className={location.pathname == '/profile/wishlist' ? 'profile-main-header-link active' : 'profile-main-header-link'}>Wishlist</Link>
                        <Link to='/profile/history' className={location.pathname == '/profile/history' ? 'profile-main-header-link active' : 'profile-main-header-link'}>Purchase History</Link>
                        <Link to='/profile/settings' className={location.pathname == '/profile/settings' ? 'profile-main-header-link active' : 'profile-main-header-link'}>Settings</Link>
                    </div>
                </div>

                <Outlet />
            </div>
        </main>
    )
});

export default ProfileLayout;