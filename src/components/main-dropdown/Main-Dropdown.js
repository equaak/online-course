import React, { useState } from 'react';
import './Main-Dropdown.css';
import arrow from '../dropdown/arrow.svg';

const Maindropdown = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggledropdown = () => setIsOpen(!isOpen);
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="maindropdown">
      <div className="maindropdown-label body-l400" onClick={toggledropdown}>
        {selectedOption || label}

        <img src={arrow} />
      </div>
      {isOpen && (
        <div className="maindropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="maindropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Maindropdown;
