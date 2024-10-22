import "./Layout.css";
import logo from "../../../layout/logo.svg";
import { observer } from "mobx-react-lite";
import { Link, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import search from './search.svg';

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
      <div className="inst-menu background-color-gray-900 inst-menu-wrapper">
        <Link to="/">
          <div className="menu-header">
            <img src={logo} alt="" />
            <p className="color-gray-white heading-04 menu-title">E-tutor</p>
          </div>
        </Link>
      </div>
      <div className="instructor-content">
        <div className="between-center instructor-settings-header background-color-gray-white">
          <div>
            <p className="body-m500">Good {dayPart}</p>
            <p className="color-gray-900 body-xxl600">Settings</p>
          </div>
          <div>
            <div className="search">
              <img src={search} alt="Search" />
              <input
                className="body-l400 color-gray-500"
                placeholder="What do you want to learn..."
              />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </main>
  );
});

export default InstructorLayout;
