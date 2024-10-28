import { observer } from "mobx-react-lite";
import { useEffect, useState, useRef, useMemo } from "react";
import axios from "axios";

import "./CreateCourse.css";

import stack from "./Stack (2).svg";
import nodepad from "./ClipboardText.svg";
import tv from "./MonitorPlay.svg";
import playcircle from "./PlayCircle (2).svg";
import arrow from "../../../components/dropdown/arrow.svg";
import upload from "./UploadSimple (1).svg";
import imageIcon from "./Image.svg";
import menu from "./Menu.svg";
import plus from "./Plus.svg";
import pencil from "./PencilLine.svg";
import trash from "./Trash.svg";
import trashHover from "./Trash (1).svg";
import pencilHover from "./PencilLine (1).svg";
import plusHover from "./PlusHover.svg";
import lecture_menu from "./Menu (1).svg";
import lecture_arrow from "./ChevronDown.svg";

import Notification from "../../../components/notification/Notification";
import userStore from "../../../store/UserStore";

const CategoryDropdown = ({ onSelect, options, option }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(option);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="course-dropdown">
      <div className="course-dropdown-label" onClick={toggleDropdown}>
        {selectedOption ? (
          <p className="course-dropdown-text body-l400 color-gray-900">
            {selectedOption}
          </p>
        ) : (
          <p className="course-dropdown-text body-l400 color-gray-400">
            Select
          </p>
        )}
        <img src={arrow} className="course-dropdown-img" />
      </div>
      {isOpen && (
        <div className="course-dropdown-menu">
          {options.map((option, index) => (
            <p
              key={index}
              className="course-dropdown-item body-m400 color-gray-700"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const DurationDropDown = ({ onSelect, option }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(option);
  const options = ["Days", "Weeks", "Months"];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="duration-dropdown">
      <div className="duration-dropdown-label" onClick={toggleDropdown}>
        {/* <p className="course-dropdown-text body-l400 color-gray-900">
          {selectedOption || "Select category"}
        </p> */}
        {selectedOption ? (
          <p className="course-dropdown-text body-l400 color-gray-900">
            {selectedOption}
          </p>
        ) : (
          <p className="course-dropdown-text body-l400 color-gray-400">
            Select
          </p>
        )}
        <img src={arrow} className="course-dropdown-img" />
      </div>
      {isOpen && (
        <div className="course-dropdown-menu">
          {options.map((option, index) => (
            <p
              key={index}
              className="course-dropdown-item body-m400 color-gray-700"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

const Thumbnail = ({ onFileInput }) => {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    ref.current.click();
  };

  const handleInput = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = async () => {
          const ratio = img.width / img.height;
          const isSixteenNine = Math.abs(ratio - 12 / 8) < 0.2;
          if (isSixteenNine) {
            setFile(file);
            const response = await fileToBase64(file);
            setImage(response);
            onFileInput(file, response);
          } else {
            setShow(true);
          }
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result.split(",")[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <input onChange={handleInput} ref={ref} type="file" accept="image/*" />
      <Notification
        message={"Follow aspect ratio of 12/8!"}
        show={show}
        onClose={handleClose}
      />
      <button
        onClick={handleClick}
        className="button-secondary medium primary button-m"
      >
        Upload Image <img src={upload} />
      </button>
    </>
  );
};

const Video = ({ onFileInput }) => {
  const ref = useRef(null);
  const [file, setFile] = useState(null);
  const [video, setVideo] = useState(null);
  const [show, setShow] = useState(false);

  const handleClick = () => {
    ref.current.click();
  };

  const handleInput = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideo(file);
      onFileInput(file);
      console.log(file);
      // const formData = new FormData();
      // formData.append('video', file);

      // try {
      //   const response = await axios.post("http://localhost:3000/upload", formData, {
      //       headers: {
      //           "Content-Type": "multipart/form-data",
      //       },
      //   });
      //   console.log("File uploaded successfully:", response.data);
      // } catch (error) {
      //     console.error("Error uploading file:", error);
      // }
    } else {
      setShow(true);
    }
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <input onChange={handleInput} ref={ref} type="file" accept="video/*" />
      <Notification
        message={"Upload video file for trailer!"}
        show={show}
        onClose={handleClose}
      />
      <button
        onClick={handleClick}
        className="button-secondary medium primary button-m"
      >
        Upload Video <img src={upload} />
      </button>
    </>
  );
};

const Modal = ({ show, onClose, children, header, onSave }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div
        className="modal-content background-color-gray-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header between-center course-border-bottom">
          <p className="body-l500 color-gray-900">{header}</p>
          <button
            className="modal-close body-xxl500 color-gray-500"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="modal-main">
          {children}
          <div className="between-center">
            <button className="button-secondary medium gray button-m">
              Cancel
            </button>
            <button
              onClick={() => onSave()}
              className="button-primary medium primary button-m"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Section = ({ info, onChange, index }) => {
  const [hovered, setHovered] = useState(null);
  const [section, setSection] = useState(info);
  const [name, setName] = useState(info.name ? info.name : "");
  const [lectures, setLectures] = useState(info.lectures ? info.lectures : []);

  const handleMouseEnter = (button) => setHovered(button);
  const handleMouseLeave = () => setHovered(null);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleEditName = () => {
    if (name !== "") {
      if (!section.name) {
        setSection((prevSection) => ({
          ...prevSection,
          sectionName: name,
        }));
      } else {
        setSection((prevSection) => ({
          ...prevSection,
          sectionName: name,
        }));
      }
      setShowModal(false);
    }
  };

  const handleAddLecture = () => {
    const newLectures = lectures;
    newLectures.push({});

    setLectures(newLectures);
  };

  useEffect(() => {
    onChange(section);
  }, [section]);

  useEffect(() => {
    setSection((prevSection) => ({
      ...prevSection,
      lectures: lectures,
    }));
  }, [lectures]);

  const handleLectureChange = (data, index) => {
    const newLectures = lectures;
    newLectures[index] = data;

    console.log(newLectures);
    setLectures(newLectures);
  };

  return (
    <div className="section-container background-color-gray-50">
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        header={"Edit Section Name"}
        onSave={() => handleEditName()}
      >
        <p className="body-m400 color-gray-900 input-title">Section</p>
        <input
          type="text"
          placeholder="Write your section name here"
          className="input body-l400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal>
      <div className="section-header">
        <div className="section-header-controls">
          <img src={menu} className="section-menu-icon" />
          <p className="body-l500">
            Section {index + 1}:{" "}
            {section?.sectionName ? section?.sectionName : "Section name"}
          </p>
        </div>
        <div className="section-header-buttons">
          <img
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => handleMouseEnter("plus")}
            src={hovered === "plus" ? plusHover : plus}
            onClick={handleAddLecture}
          />
          <img
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => handleMouseEnter("pencil")}
            src={hovered === "pencil" ? pencilHover : pencil}
            onClick={handleOpenModal}
          />
          <img
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => handleMouseEnter("trash")}
            src={hovered === "trash" ? trashHover : trash}
          />
        </div>
      </div>

      <div className="section-main">
        {lectures.map((lecture, index) => {
          return (
            <Lecture
              info={lecture}
              onChange={(data) => handleLectureChange(data, index)}
            />
          );
        })}
      </div>
    </div>
  );
};

const Lecture = ({ info, onChange, index }) => {
  const [lecture, setLecture] = useState(info);
  const [hovered, setHovered] = useState(null);
  const handleMouseEnter = (button) => setHovered(button);
  const handleMouseLeave = () => setHovered(null);
  const [children, setChildren] = useState(null);
  const [header, setHeader] = useState(null);
  const [m, setM] = useState(null);
  const [s, setS] = useState(null);
  const [options, setOptions] = useState([
    "Video",
    "Attach File",
    "Description",
    "Lecture Notes",
  ]);
  const [name, setName] = useState(info.name ? info.name : "");
  const [dropdown, setDropdown] = useState(false);

  const ref = useRef(null);
  const [file, setFile] = useState(info.video);
  const [lectureFile, setLectureFile] = useState(info.lectureFile);
  const [description, setDescription] = useState(info.description);
  const [lectureNotes, setLectureNotes] = useState(info.lectureNotes);

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setChildren("Name");
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleClick = () => {
    ref.current.click();
  };

  const childrenSave = () => {
    if (children === "Name") {
      handleEditName();
    }
    if (children === "Video") {
      handleVideo();
    }
    if (children === "Attach File") {
      handleFile();
    }
    if (children === "Description") {
      handleDescription();
    }
    if (children === "Lecture Notes") {
      handleLectureNotes();
    }
  };

  const handleVideo = () => {
    if (file !== null) {
      setLecture((prevLecture) => ({
        ...prevLecture,
        video: file,
      }));
      setShowModal(false);
    }
  };

  const handleFile = () => {
    if (lectureFile !== null) {
      setLecture((prevLecture) => ({
        ...prevLecture,
        lectureFile: lectureFile,
      }));
      setShowModal(false);
    }
  };

  const handleDescription = () => {
    if (description !== "") {
      setLecture((prevLecture) => ({
        ...prevLecture,
        description: description,
      }));
      setShowModal(false);
    }
  };
  const handleLectureNotes = () => {
    if (lectureNotes !== "") {
      setLecture((prevLecture) => ({
        ...prevLecture,
        lectureNotes: lectureNotes,
      }));
      setShowModal(false);
    }
  };

  const handleInput = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setFile(file);
      console.log(file);

      const videoURL = URL.createObjectURL(file);
      videoRef.current.src = videoURL;
      // const formData = new FormData();
      // formData.append('video', file);

      // try {
      //   const response = await axios.post("http://localhost:3000/upload", formData, {
      //       headers: {
      //           "Content-Type": "multipart/form-data",
      //       },
      //   });
      //   console.log("File uploaded successfully:", response.data);
      // } catch (error) {
      //     console.error("Error uploading file:", error);
      // }
    }
  };

  const handleLectureFileInput = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLectureFile(file);
      console.log(file);
      // const formData = new FormData();
      // formData.append('video', file);

      // try {
      //   const response = await axios.post("http://localhost:3000/upload", formData, {
      //       headers: {
      //           "Content-Type": "multipart/form-data",
      //       },
      //   });
      //   console.log("File uploaded successfully:", response.data);
      // } catch (error) {
      //     console.error("Error uploading file:", error);
      // }
    }
  };

  const handleEditName = () => {
    if (name !== "") {
      if (!lecture.lectureName) {
        setLecture((prevLecture) => ({
          ...prevLecture,
          lectureName: name,
        }));
      } else {
        setLecture((prevLecture) => ({
          ...prevLecture,
          lectureName: name,
        }));
      }
      setShowModal(false);
    }
  };

  const toggleLectureDropdown = () => {
    setDropdown((prev) => !prev);
  };

  useEffect(() => {
    if (file) {
      videoRef.current.src = URL.createObjectURL(file);
    }
  }, []);

  useEffect(() => {
    if (children === "Video") {
      setHeader("Lecture Video");
      setShowModal(true);
    }
    if (children === "Attach File") {
      setHeader("Attach File");
      setShowModal(true);
    }
    if (children === "Description") {
      setHeader("Lecture Description");
      setShowModal(true);
    }
    if (children === "Lecture Notes") {
      setHeader("Add Lecture Notes");
      setShowModal(true);
    }
    if (children === "Name") {
      setHeader("Lecture Name");
      setShowModal(true);
    }
  }, [children]);

  useEffect(() => {
    onChange(lecture);
  }, [lecture]);

  const videoRef = useRef(null);

  const handleLoadedMetadata = () => {
    const duration = videoRef.current.duration;
    setM(Math.floor(duration / 60));
    setS(Math.floor(duration % 60));
    console.log(duration);

    URL.revokeObjectURL(videoRef.current.src);
  };



  return (
    <div className="lecture-container background-color-gray-white between-center">
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        header={header}
        onSave={() => childrenSave()}
      >
        {children === "Name" ? (
          <>
            <p className="body-m400 color-gray-900 input-title">Lecture</p>
            <input
              type="text"
              placeholder="Write lecture name here"
              className="input body-l400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </>
        ) : (
          ""
        )}

        {children === "Video" ? (
          file ? (
            <div className="file-input-container">
              <div className="file-info">
                <p className="color-success-500 label-m">FILE UPLOADED</p>
                <p className="body-s400 color-gray-700">
                  {m}:{s}
                </p>
              </div>
              <p className="body-m400 color-gray-900">{file?.name}</p>
              <input
                onChange={handleInput}
                ref={ref}
                type="file"
                accept="video/*"
              />
              <p
                onClick={handleClick}
                className="body-m500 color-secondary-500"
              >
                Replace Video
              </p>
            </div>
          ) : (
            <div onClick={handleClick} className="lecture-video-input">
              <input
                onChange={handleInput}
                ref={ref}
                type="file"
                accept="video/*"
              />
              <p className="body-l500 color-gray-900">Upload Lecture video</p>
              <p className="body-m500 color-gray-500">
                Drag an drop a file or browse file
              </p>
            </div>
          )
        ) : (
          ""
        )}

        {children === "Attach File" ? (
          lectureFile ? (
            <div className="file-input-container">
              <div className="file-info">
                <p className="color-success-500 label-m">FILE UPLOADED</p>
              </div>
              <p className="body-m400 color-gray-900">{lectureFile?.name}</p>
              <input onChange={handleLectureFileInput} ref={ref} type="file" />
              <p
                onClick={handleClick}
                className="body-m500 color-secondary-500"
              >
                Replace File
              </p>
            </div>
          ) : (
            <div onClick={handleClick} className="lecture-video-input">
              <input onChange={handleLectureFileInput} ref={ref} type="file" />
              <p className="body-l500 color-gray-900">Attach file</p>
              <p className="body-m500 color-gray-500">
                Drag an drop a file or browse file
              </p>
            </div>
          )
        ) : (
          ""
        )}

        {children === "Description" ? (
          <>
            <p className="body-m400 color-gray-900 input-title">
              Lecture Description
            </p>
            <input
              type="text"
              placeholder="Write lecture description here"
              className="input body-l400"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        ) : (
          ""
        )}

        {children === "Lecture Notes" ? (
          <>
            <p className="body-m400 color-gray-900 input-title">
              Lecture Notes
            </p>
            <textarea
              type="text"
              placeholder="Write lecture notes here"
              className="input body-l400"
              value={lectureNotes}
              onChange={(e) => setLectureNotes(e.target.value)}
              rows={4}
            />
          </>
        ) : (
          ""
        )}
      </Modal>

      <video
        ref={videoRef}
        style={{ display: "none" }}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <div className="lecture-controls between-center">
        <img src={lecture_menu} alt="" />
        <p className="body-m400 color-gray-900">
          {lecture?.lectureName ? lecture?.lectureName : "Lecture Name"}
        </p>
      </div>

      <div className="lecture-buttons between-center">
        <div className="dropdown-button">
          <button
            onClick={toggleLectureDropdown}
            className="button-secondary small primary button-s"
          >
            Contents <img src={lecture_arrow} />{" "}
          </button>
          {dropdown && (
            <div className="course-dropdown-menu">
              {options.map((option, index) => (
                <p
                  key={index}
                  className="course-dropdown-item body-m400 color-gray-700"
                  onClick={() => {
                    setChildren(option);
                    setShowModal(true);
                  }}
                >
                  {option}
                </p>
              ))}
            </div>
          )}
        </div>
        <img
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => handleMouseEnter("pencil")}
          src={hovered === "pencil" ? pencilHover : pencil}
          onClick={handleOpenModal}
        />
        <img
          onMouseLeave={handleMouseLeave}
          onMouseEnter={() => handleMouseEnter("trash")}
          src={hovered === "trash" ? trashHover : trash}
        />
      </div>
    </div>
  );
};

const CreateCourse = observer(() => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("");
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState("");
  const [duration, setDuration] = useState(0);
  const [durationType, setDurationType] = useState("");
  const [show, setShow] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailBase, setThumbnailBase] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [trailerVideoUrl, setTrailerVideoUrl] = useState(null);
  const [description, setDescription] = useState(null);
  const [sections, setSections] = useState([]);

  const [stage, setStage] = useState(0);
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState(["English", "Russian"]);
  const [hovered, setHovered] = useState(null);

  const thumbnailPictureUrl = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  useEffect(() => {
    if (trailer) {
      const url = URL.createObjectURL(trailer);
      setTrailerVideoUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [trailer]);

  const getCategories = async () => {
    const responce = await axios.get(
      "http://localhost:5000/category/getCategories"
    );
    const newArray = responce.data.map((obj) => Object.values(obj)[1]);
    setCategories(newArray);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSelectCategory = (option) => {
    setCategory(option);
  };

  const handleLanguageSelect = (option) => {
    setLanguage(option);
  };

  const handleDurationTypeSelection = (option) => {
    setDurationType(option);
  };

  const onClose = () => {
    setShow(false);
  };

  const handleNext = async () => {
    if (stage === 0) {
      if (
        title === "" ||
        subTitle === "" ||
        category === "" ||
        topic === "" ||
        language === "" ||
        duration === 0 ||
        durationType === "" ||
        duration === ""
      ) {
        setShow(true);
      } else {
        if (stage + 1 < 4) {
          setStage((prev) => prev + 1);
        }
      }
    } else if (stage === 1) {
      if (thumbnail === null || trailer === null) {
        setShow(true);
      } else {
        if (stage + 1 < 4) {
          setStage((prev) => prev + 1);
        }
      }
    } else if (stage === 2) {
      console.log(sections);
      if(sections.length > 0){
        for(let i = 0; i < sections.length; i++) {
          if(sections[i].sectionName === '' || !sections[i].sectionName){
            setShow(true);
          }
          for(let j = 0; j < sections[i]?.lectures.length; i++){
            if(sections[i].lectures[j].lectureName === '' || !sections[i].lectures[j].lectureName){
              setShow(true);
            }
          }
        }
        setStage((prev) => prev + 1);
      }
      else{
        setShow(true);
      }
    }
    else if(stage === 3){

      try{
        const response = await axios.post('http://localhost:5000/course/create-course', {title: title, subtitle: subTitle, categoryName: category, topic: topic, instructorId: userStore.user.userId, thumbnail: thumbnailBase});
        handleUpload(response.data.courseId);
        for(let i = 0; i < sections.length; i++){
          for(let j = 0; j < sections[i].lectures.length; j++){
            handleUploadLecture(sections[i].lectures[j]);
          }
        }
      }
      catch(e){
        console.log(e);
      }


    }
  };

  const handleUpload = async (courseId) => {
    const formData = new FormData();
    formData.append('file', trailer);
    formData.append('filename', trailer.name);
    formData.append('courseId', courseId);

    try {
      await axios.post('http://localhost:5000/trailer/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleUploadLecture = async (lecture) => {
    const formData = new FormData();
    formData.append('video', lecture.video);
    formData.append('attach', lecture.lectureFile);
    formData.append('lectureName', lecture.lectureName);
    formData.append('description', lecture.description);
    formData.append('lectureNotes', lecture.lectureNotes);

    try {
      await axios.post('http://localhost:5000/lecture/addLecture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Lecture uploaded successfully');
    } catch (error) {
      console.error('Error uploading lecture:', error);
    }
  };

  const handlePrev = () => {
    if (stage - 1 >= 0) {
      setStage((prev) => prev - 1);
    }
  };

  const handleThumbnail = (file, imageBase) => {
    setThumbnail(file);
    setThumbnailBase(imageBase);
  };

  const handleTrailer = (file) => {
    setTrailer(file);
  };

  const handleAddSection = () => {
    setSections([...sections, {}]);
  };

  const saveSectionChange = (data, index) => {
    const newSections = sections;
    newSections[index] = data;

    setSections(newSections);
  };

  return (
    <main className="background-color-gray-100 instructor-content-wrapper">
      <Notification
        message={"Fill all inputs!"}
        show={show}
        onClose={onClose}
      />
      <div className="background-color-gray-white create-course-container">
        <div className="create-course-header between-center">
          <div className="create-course-header-item">
            <div className="create-course-header-item-info">
              <img src={stack} />
              <p className="body-l500 color-gray-900">Basic Information</p>
            </div>
            {stage === 0 ? (
              <div className="background-color-primary-500 active" />
            ) : (
              ""
            )}
          </div>

          <div className="create-course-header-item">
            <div className="create-course-header-item-info">
              <img src={nodepad} />
              <p className="body-l500 color-gray-900">Advance Information</p>
            </div>
            {stage === 1 ? (
              <div className="background-color-primary-500 active" />
            ) : (
              ""
            )}
          </div>

          <div className="create-course-header-item">
            <div className="create-course-header-item-info">
              <img src={tv} />
              <p className="body-l500 color-gray-900">Curriculum</p>
            </div>
            {stage === 2 ? (
              <div className="background-color-primary-500 active" />
            ) : (
              ""
            )}
          </div>

          <div className="create-course-header-item">
            <div className="create-course-header-item-info">
              <img src={playcircle} />
              <p className="body-l500 color-gray-900">Publish Course</p>
            </div>
            {stage === 3 ? (
              <div className="background-color-primary-500 active" />
            ) : (
              ""
            )}
          </div>
        </div>

        {stage === 0 ? (
          <>
            <div className="basic-info-header between-center">
              <p className="heading-04">Basic Information</p>

              <div className="basic-info-header-buttons">
                <button className="button-secondary medium primary button-m">
                  Save
                </button>
                <button className="button-tertiary medium primary button-m">
                  Save and Preview
                </button>
              </div>
            </div>
            <div className="basic-info-main">
              <div className="basic-info-part">
                <p className="body-m400 color-gray-900 input-title">Title</p>
                <input
                  type="text"
                  placeholder="Your course title"
                  className="input body-l400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="basic-info-part">
                <p className="body-m400 color-gray-900 input-title">Subtitle</p>
                <input
                  type="text"
                  placeholder="Your course subtitle"
                  className="input body-l400"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                />
              </div>

              <div className="basic-info-part">
                <p className="body-m400 color-gray-900 input-title">
                  Course Category
                </p>
                <CategoryDropdown
                  onSelect={handleSelectCategory}
                  options={categories}
                  option={category}
                />
              </div>

              <div className="basic-info-part">
                <p className="body-m400 color-gray-900 input-title">
                  Course Topic
                </p>
                <input
                  type="text"
                  placeholder="What is primarily taught in your course?"
                  className="input body-l400"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="course-dropdowns">
                <div className="basic-info-part">
                  <p className="body-m400 color-gray-900 input-title">
                    Course Language
                  </p>
                  <CategoryDropdown
                    onSelect={handleLanguageSelect}
                    options={languages}
                    option={language}
                  />
                </div>

                <div className="basic-info-part">
                  <p className="body-m400 color-gray-900 input-title">
                    Course Duration
                  </p>
                  <div className="duration-input-container">
                    <div className="between-center">
                      <input
                        className="duration-input body-l400"
                        type="number"
                        placeholder="Duration..."
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                      />
                      <DurationDropDown
                        onSelect={handleDurationTypeSelection}
                        option={durationType}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}

        {stage === 1 ? (
          <>
            <div className="basic-info-header between-center">
              <p className="heading-04">Advance Information</p>

              <div className="basic-info-header-buttons">
                <button className="button-secondary medium primary button-m">
                  Save
                </button>
                <button className="button-tertiary medium primary button-m">
                  Save and Preview
                </button>
              </div>
            </div>
            <div className="advanced-info-main course-border-bottom">
              <div className="between-start">
                <div className="advanced-info-part">
                  <p className="body-xl500 color-gray-900 advanced-title">
                    Course Thumbnail
                  </p>
                  <div className="advanced-info-part between-start">
                    {thumbnail !== null ? (
                      <img
                        className="thumbnail-img"
                        src={thumbnailPictureUrl}
                      ></img>
                    ) : (
                      <div className="background-color-gray-50 default-img">
                        <img src={imageIcon} />
                      </div>
                    )}

                    <div className="thumbnail-info">
                      <p className="body-m400 color-gray-600">
                        Upload your course Thumbnail here. Important guidelines:
                        1200x800 pixels or 12:8 Ratio. Supported format: .jpg,
                        .jpeg, or .png
                      </p>
                      <Thumbnail onFileInput={handleThumbnail} />
                    </div>
                  </div>
                </div>

                <div className="advanced-info-part">
                  <p className="body-xl500 color-gray-900 advanced-title">
                    Course Trailer
                  </p>
                  <div className="advanced-info-part between-start">
                    {trailerVideoUrl !== null ? (
                      <video
                        muted
                        loop
                        autoPlay
                        width="220"
                        src={trailerVideoUrl}
                      ></video>
                    ) : (
                      <div className="background-color-gray-50 default-img">
                        <img src={imageIcon} />
                      </div>
                    )}

                    <div className="thumbnail-info">
                      <p className="body-m400 color-gray-600">
                        Students who watch a well-made promo video are 5X more
                        likely to enroll in your course. We've seen that
                        statistic go up to 10X for exceptionally awesome videos.
                      </p>
                      <Video onFileInput={handleTrailer} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="advanced-info-main">
              <p className="body-xl500 color-gray-900">Course Description</p>
              <textarea
                type="text"
                placeholder="Enter your course description"
                className="input textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </>
        ) : (
          ""
        )}

        {stage === 2 ? (
          <>
            <div className="basic-info-header between-center">
              <p className="heading-04">Course Curriculum</p>

              <div className="basic-info-header-buttons">
                <button className="button-secondary medium primary button-m">
                  Save
                </button>
                <button className="button-tertiary medium primary button-m">
                  Save and Preview
                </button>
              </div>
            </div>
            <div className="advanced-info-main">
              <div className="sections">
                {sections.map((section, index) => {
                  return (
                    <Section
                      onChange={(data) => saveSectionChange(data, index)}
                      info={section}
                      index={index}
                    />
                  );
                })}
              </div>

              <div
                onClick={handleAddSection}
                className="button-secondary medium primary button-m"
              >
                Add Section
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="basic-main-buttons between-center">
          <button
            onClick={handlePrev}
            className="button-tertiary large gray button-l"
          >
            {stage === 0 ? "Cancel" : "Previous"}
          </button>
          <button
            onClick={handleNext}
            className="button-primary large primary button-l"
          >
            Save & Next
          </button>
        </div>
      </div>
    </main>
  );
});

export default CreateCourse;
