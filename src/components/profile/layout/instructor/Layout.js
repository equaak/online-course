import "./Layout.css";
import logo from "../../../layout/logo.svg";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import search from './search.svg';
import userStore from "../../../../store/UserStore";
import icon from '../../../layout/UserCircle.svg';
import bell from '../../../layout/Bell.svg';

const InstructorLayout = observer(() => {
  const [dayPart, setDayPart] = useState("");

  useEffect(() => {
    getPartOfDay();
  }, []);

  const getPartOfDay = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setDayPart("morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setDayPart("afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setDayPart("evening");
    } else {
      setDayPart("night");
    }
  };

  return (
    <main className="instructor-wrapper">
      <div className="inst-menu background-color-gray-900">
        <Link to="/">
          <div className="menu-header inst-menu-wrapper">
            <img src={logo} alt="" />
            <p className="color-gray-white heading-04 menu-title">E-tutor</p>
          </div>
        </Link>
      </div>
      <div className="instructor-content">
        <div className="between-center instructor-settings-header background-color-gray-white">
          <div>
            <p className="body-m500 color-gray-600 greeting">Good {dayPart}</p>
            <p className="color-gray-900 body-xxl600">Settings</p>
          </div>
          <div className="between-center instructor-rights">
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
