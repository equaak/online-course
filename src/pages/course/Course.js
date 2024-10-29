import { observer } from "mobx-react-lite";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Course.css";
import axios from "axios";

import icon from '../../components/layout/UserCircle.svg';
import users from './Users (2).svg';
import notebook from './Notebook.svg';

const Course = observer(() => {
  const { id } = useParams();
  const [course, setCourse] = useState({});
  const [instructor, setInstructor] = useState();
  const [enrollment, setEnrollment] = useState(0);

  useEffect(() => {
    getCourse();
    getCourseIntructor();
    getCourseEnrollment();
  }, []);

  const getCourse = async () => {
    const response = await axios.get(
      `http://localhost:5000/course/get-course?id=${id}`
    );

    setCourse(response.data);
  };

  const getCourseEnrollment = async () =>{
    const responce = await axios.get('http://localhost:5000/enrollment/get-enrollment-size?id=' + id);
    
    setEnrollment(responce.data);
  }

  const getCourseIntructor = async () => {
    const response = await axios.get(`http://localhost:5000/course/get-course-instructor?id=${id}`);
    console.log(response.data);
    setInstructor(response.data);
  }

  const courseThumbnail = (thumbnail) => {
    if (!thumbnail.includes("data:image/png;base64,")){
        thumbnail = `data:image/png;base64,${thumbnail}`;
    }
    return thumbnail;
  }

  return (
    <main className="course-block">
      <div className="background-color-gray-100">
        <div className="mid-wrapper single-course-header">
          <div className="between-start">
            <div className="course-basics">
              <p className="heading-03 color-gray-900">{course.title}</p>
              <p className="body-xxl400 color-gray-700">{course.subtitle}</p>

              <div className="course-instructor-info">
                <img src={instructor?.pfp ? courseThumbnail(instructor?.pfp) : icon} />
                <div className="course-instructor-text">
                  <p className="body-m400 color-gray-600">Created by: </p>
                  <p className="body-l500 color-gray-900">{instructor?.firstName} {instructor?.lastName}</p>
                </div>
              </div>
            </div>

            <div className="course-info background-color-gray-white column-between-center">
              <div className="course-info-header">
                <p className="body-xxxl400">Course price: ${course.price}</p>
              </div>
              <div className="coures-info-main column-between-center">
                <div className="between-center">
                  <div className="course-info-icon">
                    <img src={users} />
                    <p className="body-m400 color-gray-900">Students Enrolled</p>
                  </div>
                  <p className="body-m400 color-gray-600">{enrollment}</p>
                </div>

                <div className="between-center">
                  <div className="course-info-icon">
                    <img src={notebook} />
                    <p className="body-m400 color-gray-900">Language</p>
                  </div>
                  <p className="body-m400 color-gray-600">English</p>
                </div>
              </div>
            </div>
          </div>


        </div>
        <div className="background-color-gray-white">
          <div className="mid-wrapper">
            <div className="between-start">
              <div className="course-overview">
                <video controls src={`http://localhost:5000/trailer/${course.courseId}`}></video>

                <p className="heading-04 color-gray-900">Description</p>
                <p className="body-m400 color-gray-700">{course.description}</p>
              </div>
              <div className="course-controls">
                <div className="course-info column-between-center">
                  <button className="button-primary large primary button-l">Add to cart</button>
                  <Link to={'/watch-course/' + id}>                  
                    <button className="button-secondary large primary button-l">Buy now</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
});

export default Course;
