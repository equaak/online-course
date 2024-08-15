import React, { useState } from 'react';
import arrow from './arrow.svg';
import './Dropdown.css';

const Dropdown = ({ options, label, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className='dropdown'>
      <div className='dropdown-label' onClick={toggleDropdown}>
        <p className='dropdown-text'>{selectedOption || label}</p>
        <img src={arrow} className='dropdown-img'/>
      </div>
      {isOpen && (
        <div className='dropdown-menu'>
          {options.map((option, index) => (
            <div
              key={index}
              className='dropdown-item'
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

export default Dropdown;
