import { observer } from 'mobx-react-lite';
import './CourseIcon.css';

import axios from 'axios';

import star from './Star.svg';
import user from './User.svg';

import { useState, useEffect } from 'react';

const CourseIcon = observer(({course}) => {
    const [rating, setRating] = useState(null);
    const [enrollment, setEnrollmnet] = useState(null);
    const [categories, setCategories] = useState([]);

    const courseThumbnail = (thumbnail) => {
        if (!thumbnail.includes("data:image/png;base64,")){
            thumbnail = `data:image/png;base64,${thumbnail}`;
        }
        return thumbnail;
    }


    useEffect(() => {
        getCourseRating();
        getCourseEnrollment();
        getCategories();
    }, [])


    const getCourseRating = async () =>{
        const responce = await axios.get('http://localhost:5000/rating/get-rating?id=' + course.courseId);

        if(responce.data.length > 0){
            let ratingSum = 0; 
            for(let i = 0 ; i < responce.data.length; i++){
                ratingSum += responce.data[i].rating;
            }
    
            setRating(ratingSum / responce.data.length);
        }
        else{
            setRating(0);
        }
    }

    const getCourseEnrollment = async () =>{
        const responce = await axios.get('http://localhost:5000/enrollment/get-enrollment-size?id=' + course.courseId);
        
        setEnrollmnet(responce.data);
    }

    const getCategories = async () => {
        const responce = await axios.get('http://localhost:5000/category/getCategories');
        const newArray = responce.data.map(obj => Object.values(obj)[1]);
        setCategories(newArray);
    }


    return(
        <div className='course-icon-container'>
            <img src={courseThumbnail(course.thumbnail)} />
            <div className='course-icon-info'>
                <div className='course-icon-basics between-center'>
                    <div className='course-category-container background-color-primary-100'>
                        <p className='label-s color-primary-700'>{categories[course.categoryId - 1]}</p>
                    </div>
                    <p className='body-xl500 color-primary-500'>${course?.price}</p>
                </div>
                <p className='body-l500 color-gray-900'>{course.title}</p>
            </div>
            <div className='course-icon-ratings between-center'>
                <div className='course-icon-rating-container between-center'>
                    <img src={star} />
                    <p className='body-m500 color-gray700'>{rating === 0 ? 'No ratings yet' : rating}</p>
                </div>

                <div className='course-students-container between-center'>
                    <img src={user} />
                    <p className='body-m400 color-gray-500'><span className='body-m500 color-gray-700'>{enrollment}</span> students</p>
                </div>
            </div>
        </div>
    )
});

export default CourseIcon;