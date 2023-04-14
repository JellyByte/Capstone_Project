import React, { useState } from 'react';

const Dropdown = ({ options, placeholder, onOptionSelect }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
  
    const filteredOptions = options.filter(option =>
      option.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const handleOptionClick = option => {
      setSelectedOption(option);
      onOptionSelect(option);
    };
  
    return (
      <div>
        <input
          className="px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
        <div className="max-h-40 overflow-y-auto">
          <ul>
            {filteredOptions.map(option => (
              <li
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`cursor-pointer ${
                  selectedOption === option ? 'bg-blue-500 text-white' : ''
                }`}
                onMouseOver={e => {
                  e.target.classList.add('bg-gray-200');
                }}
                onMouseOut={e => {
                  e.target.classList.remove('bg-gray-200');
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default Dropdown;
