import "./Layout.css";
import logo from "../../../layout/logo.svg";
import { observer } from "mobx-react-lite";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import search from './search.svg';
import userStore from "../../../../store/UserStore";
import icon from '../../../layout/UserCircle.svg';
import bell from '../../../layout/Bell.svg';

import chartbar from './ChartBar.svg';
import pluscircle from './PlusCircle.svg';
import stack from './Stack.svg';
import creditcard from './CreditCard.svg';
import chat from './ChatCircleDots.svg';
import settings from './Gear.svg';
import signout from './SignOut.svg';

import chartbarActive from './ChartBarActive.svg';
import pluscircleActive from './PlusCircleActive.svg';
import stackActive from './StackActive.svg';
import creditcardActive from './CreditCardActive.svg';
import chatActive from './ChatCircleDotsActive.svg';
import settingsActive from './GearActive.svg';

const InstructorLayout = observer(() => {
  const [dayPart, setDayPart] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getPartOfDay();
  }, []);

  const getPartOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setDayPart("Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setDayPart("Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setDayPart("Evening");
    } else {
      setDayPart("Night");
    }
  };

  function capitalizeFirstLetter(word) {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const handleLogout = () => {
    userStore.clearUser();
    navigate('/');
  }

  return (
    <main className="instructor-wrapper">
      <div className="inst-menu background-color-gray-900">
        <Link to="/">
          <div className="menu-header inst-menu-wrapper">
            <img src={logo} alt="" />
            <p className="color-gray-white heading-04 menu-title">E-tutor</p>
          </div>
        </Link>
        <div>
          <Link to='/instructor/dashboard'>
            <div className={location.pathname === '/instructor/dashboard' ? "side-bar-wrapper background-color-primary-500" : 'side-bar-wrapper'}>
              <img src={location.pathname === '/instructor/dashboard' ? chartbarActive : chartbar} alt="" />
              <p className={location.pathname === '/instructor/dashboard' ? "body-m500 color-gray-white" : 'body-m500 color-gray-500'}>Dashboard</p>
            </div>
          </Link>
          <Link to='/instructor/new-course'>
            <div className={location.pathname === '/instructor/new-course' ? "side-bar-wrapper background-color-primary-500" : 'side-bar-wrapper'}>
              <img src={location.pathname === '/instructor/new-course' ? pluscircleActive : pluscircle} alt="" />
              <p className={location.pathname === '/instructor/new-course' ? "body-m500 color-gray-white" : 'body-m500 color-gray-500'}>Create New Course</p>
            </div>
          </Link>

          <Link to='/instructor/my-courses'>
            <div className={location.pathname === '/instructor/my-courses' ? "side-bar-wrapper background-color-primary-500" : 'side-bar-wrapper'}>
              <img src={location.pathname === '/instructor/my-courses' ? stackActive : stack} alt="" />
              <p className={location.pathname === '/instructor/my-courses' ? "body-m500 color-gray-white" : 'body-m500 color-gray-500'}>My courses</p>
            </div>
          </Link>

          <Link to='/instructor/earnings'>
            <div className={location.pathname === '/instructor/earnings' ? "side-bar-wrapper background-color-primary-500" : 'side-bar-wrapper'}>
              <img src={location.pathname === '/instructor/earnings' ? creditcardActive : creditcard} alt="" />
              <p className={location.pathname === '/instructor/earnings' ? "body-m500 color-gray-white" : 'body-m500 color-gray-500'}>Earnings</p>
            </div>
          </Link>

          <Link to='/instructor/message'>
            <div className={location.pathname === '/instructor/message' ? "side-bar-wrapper background-color-primary-500" : 'side-bar-wrapper'}>
              <img src={location.pathname === '/instructor/message' ? chatActive : chat} alt="" />
              <p className={location.pathname === '/instructor/message' ? "body-m500 color-gray-white" : 'body-m500 color-gray-500'}>Message</p>
            </div>
          </Link>

          <Link to='/instructor/settings'>
            <div className={location.pathname === '/instructor/settings' ? "side-bar-wrapper background-color-primary-500" : 'side-bar-wrapper'}>
              <img src={location.pathname === '/instructor/settings' ? settings : settingsActive} alt="" />
              <p className={location.pathname === '/instructor/settings' ? "body-m500 color-gray-white" : 'body-m500 color-gray-500'}>Settings</p>
            </div>
          </Link>
        </div>
        
        <div onClick={handleLogout} className='sign-out'>
          <div className="side-bar-wrapper">
            <img src={signout} alt="" />
            <p className='body-m500 color-gray-500'>Sign-out</p>
          </div>
        </div>
      </div>
      <div className="instructor-content">
        <div className="between-center instructor-settings-header background-color-gray-white">
          <div>
            <p className="body-m500 color-gray-600 greeting">Good {dayPart}</p>
            <p className="color-gray-900 body-xxl600">{capitalizeFirstLetter(location.pathname.split('/')[2])}</p>
          </div>
          <div className="instructor-rights">
            <div className="search background-color-gray-50">
              <img src={search} alt="Search" />
              <input
                className="body-l400 color-gray-500"
                placeholder="Search"
                style={{maxHeight: '45px'}}
              />
            </div>
            <Link to='/instructor/notifications'>            
              <div className="notifications-container background-color-gray-50">
                <img src={bell} alt="" className="inst-bell"/>
              </div>
            </Link>

            <Link className="between-center inst-pfp-link" to='/instructor/settings'>            
              <img className='inst-pfp-icon' src={userStore?.pfp ? userStore.pfp : icon} alt="Profile" />
            </Link>
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  );
});

export default InstructorLayout;
