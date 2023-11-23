import React, { useState } from 'react';
import {Link} from 'react-router-dom'

const SearchButtonWithInput = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleButtonClick = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <div>
      {showSearchBar ? (
        <div>
          <label htmlFor="searchInput">Enter poll ID:</label>
          <input 
            type="text" 
            id="searchInput" 
            placeholder="Type here..."
          />
          <Link to="/viewpoll">
            Search
          </Link>
          <button onClick={handleButtonClick}>Go Back</button>
        </div>
      ) : (
        <div>
          <button onClick={handleButtonClick}>Find Poll</button>
        </div>
      )}
    </div>
  );
};

export default SearchButtonWithInput;


