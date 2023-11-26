import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [pollID, setID] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Update the URL with the user's input
    navigate({
        pathname: `/viewpoll/${pollID}`,
      });
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Search..."
        value={pollID}
        onChange={(e) => setID(e.target.value)}
        style={{ justifyself: 'right', padding: '10px', height: '38px', width: '100px', fontSize: '14px', marginLeft: '35%', marginRight: '5px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px', height: '40px', fontSize: '16px'}}>Search</button>
    </div>
  );
};

export default SearchBar;