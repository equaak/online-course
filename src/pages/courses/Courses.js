import { observer } from 'mobx-react-lite';
import {useEffect,useState} from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Courses.css';
import axios from 'axios';

const Courses = observer(() => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCourses();
    getCategories();
  }, [])

  const getCourses = async () => {
    const response = await axios.get('http://localhost:5000/course/getAllCourses');
    console.log(response.data);
    setCourses(response.data);
  }

  const getCategories = async () => {
    const responce = await axios.get('http://localhost:5000/category/getCategories');
    const newArray = responce.data.map(obj => Object.values(obj)[1]);
    setCategories(newArray);
  }

  const courseThumbnail = (thumbnail) => {
    if (!thumbnail.includes("data:image/png;base64,")){
      thumbnail = `data:image/png;base64,${thumbnail}`;
    }
    return thumbnail
  }

  return(
    <main className='mid-wrapper courses-block'>
      <div className='courses between-center'>
        {courses.map((course) => {
          console.log(course)
          return(
            <Link to={`/course/${course.courseId}`}>
              <div className='course-item-container'>
                <img src={courseThumbnail(course.thumbnail)} />
                <div className='course-item-info-container'>
                  <p className='body-m500 color-error-700'>Course category: {categories[course.categoryId - 1]}</p>
                  <p className='body-l500 colog-gray-900 course-title'>{course.title}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </main>
  )
})

export default Courses;