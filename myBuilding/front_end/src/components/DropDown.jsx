import React, { useState } from 'react';

const Dropdown = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleButtonClick = () => {
    console.log(selectedOption);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
      <ul>
        {filteredOptions.map(option => (
          <li key={option} onClick={() => setSelectedOption(option)}>
            {option}
          </li>
        ))}
      </ul>
      {selectedOption && (
        <div>
          <p>Selected option: {selectedOption}</p>
          <button onClick={handleButtonClick}>Log selected option</button>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
