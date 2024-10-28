import { observer } from "mobx-react-lite";
import "./InstructorDashboard.css";

import playcircle from "../../profile/dashboard/PlayCircle.svg";
import activecourses from "../../profile/dashboard/CheckSquareOffset.svg";
import users from "../../profile/dashboard/Users.svg";
import trophy from "../../profile/dashboard/Trophy.svg";

import usercircle from "./UserCircle.svg";
import creditcard from "./CreditCard (1).svg";
import notepad from "./Notepad.svg";
import stack from "./Stack (1).svg";
import Chart from "../../../components/chart/Chart";
import { useEffect, useRef, useState } from "react";
import icon from "../../../components/layout/UserCircle.svg";

import userStore from "../../../store/UserStore";

const InstructorDashboard = observer(() => {
  const [revenue, setRevenue] = useState(
    Array.from({ length: 31 }, () => Math.floor(Math.random() * 500000) + 10000)
  );
  const [width, setWidth] = useState(0);
  const [complition, setComplition] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      const style = window.getComputedStyle(element);
      const cwidth =
        element.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      console.log(cwidth);
      setWidth(cwidth * 0.45);
    }

    if (userStore.user?.biography !== null && userStore.user?.title !== null) {
      setComplition(2);
    }
    if (userStore.user?.title === null && userStore.user?.biography !== null) {
      setComplition(1);
    }
    if (userStore.user?.title !== null && userStore.user?.biography === null) {
      setComplition(1);
    }
  }, [width]);

  return (
    <main
      ref={ref}
      className="background-color-gray-100 instructor-settings-header"
    >
      <div className="instructor-dashboard-row">
        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-primary-100 instructor-dashboard-item-image">
            <img src={playcircle} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Enrolled Courses</p>
          </div>
        </div>

        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-secondary-100 instructor-dashboard-item-image">
            <img src={activecourses} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Active Courses</p>
          </div>
        </div>

        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-warning-100 instructor-dashboard-item-image">
            <img src={users} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Course Instructors</p>
          </div>
        </div>

        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-success-100 instructor-dashboard-item-image">
            <img src={trophy} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Completed Courses</p>
          </div>
        </div>
      </div>

      <div className="instructor-dashboard-row">
        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-error-100 instructor-dashboard-item-image">
            <img src={usercircle} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Students</p>
          </div>
        </div>

        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-success-100 instructor-dashboard-item-image">
            <img src={notepad} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Online Courses</p>
          </div>
        </div>

        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-gray-50 instructor-dashboard-item-image">
            <img src={creditcard} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Total Earnings</p>
          </div>
        </div>

        <div className="background-color-gray-white instructor-dashboard-item">
          <div className="background-color-secondary-100 instructor-dashboard-item-image">
            <img src={stack} alt="" />
          </div>

          <div className="instructor-dashboard-item-texts">
            <p className="body-xxxl400 color-gray-900">957</p>
            <p className="body-m400 color-gray-700">Completed Courses</p>
          </div>
        </div>
      </div>

      <div className="background-color-secondary-900 between-center complition-block">
        <div className="complition-info">
          <img src={userStore?.pfp ? userStore.pfp : icon} />
          <div className="complition-text">
            <p className="body-xxl600 color-gray-white">
              {userStore.user?.firstName} {userStore.user?.lastName}
            </p>
            <p className="body-m400 color-gray-600 complition-email">
              {userStore.user?.email}
            </p>
          </div>
        </div>

        <div className="between-center">
          {complition / 2 == 0.5 ? (
            <>
              <p className="body-m500 color-gray-600">{complition}/2 Steps</p>
              <div className="complition-container background-color-gray-700">
                <div className="completed-scale background-color-success-500 half"></div>
              </div>
            </>
          ) : (
            <div></div>
          )}

          {complition / 2 == 0 ? (
            <>
              <p className="body-m500 color-gray-600">{complition}/2 Steps</p>
              <div className="complition-container background-color-gray-700"></div>
            </>
          ) : (
            <div></div>
          )}
        </div>

        <button className="button-primary medium primary button-m">Complete info</button>
      </div>

      <div className="between-center">
        <div className="chart">
          <div className="chart-header background-color-gray-white">
            <p className="body-l500">Revenue</p>
          </div>
          <Chart data={revenue} w={width} h={400} />
        </div>
        <div className="chart background-color-gray-white">
          <div className="chart-header background-color-gray-white">
            <p className="body-l500">Overall Course Rating</p>
          </div>
          <div className="rating-container">
            <div className="between-center">
              <div className="background-color-warning-100 rating-info">
                <p className="heading-02">4.6</p>
                <p className="body-m500">Overall rating</p>
              </div>
              <Chart data={revenue} w={width * 0.7} h={200} />
            </div>
            <div className="ratings">
                <div className="">

                </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

export default InstructorDashboard;
