import { observer } from "mobx-react-lite";
import { useState } from "react";
import "./Section.css";

import playcircle from "../../pages/watch-course/PlayCircle (3).svg";
import arrow from "./Arrow - Down 2.svg";

const SectionIcon = observer(({ section, lectures, onClick }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="section-icon">
      <div onClick={handleClick} className="section-icon-header between-center background-color-gray-50">
        <div className="section-icon-title between-center">
          <img src={arrow} className={open ? "inverted" : ""} />
          <p className="body-l500 color-primary-500">{section.sectionName}</p>
        </div>
        <div className="section-icon-header-lectures between-center">
          <img src={playcircle} />
          <p className="body-m400">
            {lectures.length} {lectures.length == 1 ? "lecture" : "lectures"}
          </p>
        </div>
      </div>
      {open ? 
        <div className="section-icon-main">
            {lectures.map((lecture, index) => {
                return(
                    <div onClick={() => onClick(section.sectionOrder, lecture.lectureOrder)} className="section-icon-lecture">
                        <p className="body-m400 color-gray-900">{index + 1}. {lecture.lectureName}</p>
                    </div>
                )
            })}
        </div> 
      : 
        ""
      }
    </div>
  );
});

export default SectionIcon;
