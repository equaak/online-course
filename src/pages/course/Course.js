import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Course.css";
import axios from "axios";

const Course = observer(() => {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    getCourse();
  }, []);

  const getCourse = async () => {
    const response = await axios.get(
      `http://localhost:5000/course/get-course?id=${id}`
    );

    const response1 = await axios.get(
      `http://localhost:5000/trailer/getTrailerByID/${id}`
    );

    console.log(response1.data.filePath.split('\\')[2]);

    const response2 = await axios.get(`http://localhost:5000/trailer/video/${(response1.data.filePath.split('\\')[2])}`);
    console.log(response2.data);

    console.log(response.data)
    setCourse(response.data);
  };

  return (
    <main className="mid-wrapper course-block">
      <p className="heading-03 color-gray-900">{course.title}</p>
      <video></video>

      <p className="heading-04 color-gray-900">Description</p>
      <p className="body-m400 color-gray-700">{course.topic}</p>
    </main>
  );
});

export default Course;
