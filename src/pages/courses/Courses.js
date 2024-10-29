import { observer } from 'mobx-react-lite';
import {useEffect,useState} from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Courses.css';
import axios from 'axios';

import CourseIcon from '../../components/courseIcon/CourseIcon';

const Courses = observer(() => {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCourses();
    getCategories();
  }, [])

  const getCourses = async () => {
    const response = await axios.get('http://localhost:5000/course/get-courses');
    console.log(response.data);
    setCourses(response.data);
  }

  const getCategories = async () => {
    const responce = await axios.get('http://localhost:5000/category/getCategories');
    const newArray = responce.data.map(obj => Object.values(obj)[1]);
    setCategories(newArray);
  }

  return(
    <main className='mid-wrapper courses-block'>
      <div className='courses between-center'>
        {courses.map((course) => {
          console.log(course)
          return(
            <Link to={`/course/${course.courseId}`}>
              <CourseIcon course={course}/>
            </Link>
          )
        })}
      </div>
    </main>
  )
})

export default Courses;