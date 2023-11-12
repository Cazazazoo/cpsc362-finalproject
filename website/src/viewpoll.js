import React, { useState, useEffect } from 'react';


function ViewPoll () {
  // State to store poll data
  const [pollData, setPollData] = useState(null);

  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // UseHistory hook for navigation
  // const history = useHistory();

  // UseEffect to fetch poll data from the database
  useEffect(() => {
    fetch('http://localhost:3001/polls') // Replace with your actual server URL
      .then((response) => response.json())
      .then((data) => {
        setPollData(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means it will run once when the component mounts

  // Function to handle option selection
  const handleOptionSelect = (optionId) => {
    setSelectedOption(optionId);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Your component UI goes here
  return (
    <div className='view-poll-container'>
      <h1>{pollData ? pollData.title : "Loading..."}</h1>
      <div className="poll-area">
        {/* Map through options and create buttons for each */}
        {pollData &&
          pollData.options.map((option) => (
            <div key={option.id} className="option">
              <button onClick={() => handleOptionSelect(option.id)}>
                {option.text}
              </button>
            </div>
          ))}
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default ViewPoll;