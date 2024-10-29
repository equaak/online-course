import { observer } from 'mobx-react-lite';
import './WatchCourse.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import folder from './FolderNotchOpen.svg';
import playcircle from './PlayCircle (3).svg';
import arrow from './ArrowLeft.svg';

import { Link } from 'react-router-dom';
import SectionIcon from '../../components/sectionIcon/SectionIcon';

const WatchCourse = observer(() => {
    const { id } = useParams();
    const [course, setCourse] = useState({});
    const [lectures, setLectures] = useState([]);
    const [sections, setSections] = useState([]);

    const [sectionOrder, setSectionOrder] = useState(1);
    const [lectureOrder, setLectureOrder] = useState(null);

    const [section, setSection] = useState({});
    const [lecture, setLecture] = useState({});

    useEffect(() => {
        getCourse();
    }, [])

    useEffect(() => {
        getSections();
    }, [course])

    useEffect(() => {
        getLectures();
    }, [sections])

    useEffect(() => {
        setLecture(lectures.find(lecture => lecture.sectionId === sectionOrder && lecture.lectureOrder === lectureOrder));
    }, [sectionOrder])

    useEffect(() => {
        setLecture(lectures.find(lecture => lecture.sectionId === sectionOrder && lecture.lectureOrder === lectureOrder));
    }, [lectureOrder])

    const getCourse = async () => {
        const response = await axios.get(
            `http://localhost:5000/course/get-course?id=${id}`
        );

        setCourse(response.data);
    };

    const getLectures = async () => {
        const response = await axios.get(
            `http://localhost:5000/lecture/get-lectures?id=${id}`
        );
        console.log(response.data);
        setLectures(response.data);
        setLectureOrder(1);
    };

    const getSections = async () => {
        const response = await axios.get(
            `http://localhost:5000/section/get-sections?id=${id}`
        );
        console.log(response.data);
        setSections(response.data);
    };

    const getLecturesBySection = (sId) => {
        return lectures.filter(lecture => lecture.sectionId === sId);
    }

    const getLectureClick = (sectionO, lectureO) => {
        setSectionOrder(sectionO);
        setLectureOrder(lectureO);
    }

    return(
        <main>
            <div className='watch-course-header background-color-gray-50'>
                <div className='wide-wrapper between-center'>
                    <div className='between-center'>
                        <Link to={'/course/' + id}>                        
                            <div className='back-arrow background-color-gray-white'>
                                <img src={arrow} />
                            </div>
                        </Link>
                        <div>
                            <p className='body-xl500'>{course.title}</p>
                            <div className='watch-course-info'>
                                <div className='watch-course-header-info'>
                                    <img src={folder} />
                                    <p className='body-m400 color-gray-700'>{sections.length} {sections.length === 1 ? 'Section' : 'Sections'}</p>
                                </div>

                                <div className='watch-course-header-info'>
                                    <img src={playcircle} />
                                    <p className='body-m400 color-gray-700'>{lectures.length} {lectures.length === 1 ? 'Lecture' : 'Lectures'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='watch-course-header-buttons between-center'>
                        <button className='button-secondary medium primary button-m'>Write A Review</button>
                        <button className='button-primary medium primary button-m'>Next Lecture</button>
                    </div>
                </div>
            </div>
            <div className='wide-wrapper'>
                <div className='watch-course-main between-start'>
                    
                    <div className='watch-course-video'>
                        {lecture?.videoPath ? <video controls src={'http://localhost:5000/lecture/get-lecture-video?id=' + lecture?.lectureId} /> : ''}
                        <div className='watch-course-video-header'>
                            <p className='heading-03 color-gray-900'>{lecture?.lectureOrder}. {lecture?.lectureName}</p>
                        </div>
                        {lecture?.description !== 'undefined' ? <><p className='heading-04'>Lecture Description</p>
                            <p className='body-m400'>{lecture?.description}</p></> : ''}
                        

                    </div>
                    <div className='watch-course-cirruculum'>
                        <p className='heading-04'>Course Contents</p>
                        {sections.map((section, index) => {
                            return <SectionIcon onClick={getLectureClick} lectures={getLecturesBySection(index + 1)} section={section}/>
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
})

export default WatchCourse;