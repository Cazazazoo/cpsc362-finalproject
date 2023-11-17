import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ViewAnswers() {
  // State to store poll data
  const [polls, setPolls] = useState([]);
  // State to store response data
  const [responses, setResponses] = useState([]);
  // State to store the searched poll ID
  const [searchedPollId, setSearchedPollId] = useState('');
  // State to store filtered poll titles
  const [filteredTitles, setFilteredTitles] = useState([]);
  // State to store filtered responses
  const [filteredResponses, setFilteredResponses] = useState([]);

  // Fetch poll data when the component mounts
  useEffect(() => {
    Axios.get('http://localhost:3001/polls')
      .then(response => {
        setPolls(response.data);
      })
      .catch(error => {
        console.error('Error fetching poll data:', error);
      });
  }, []);

  // Fetch response data when the component mounts
  useEffect(() => {
    Axios.get('http://localhost:3001/resp')
      .then(response => {
        setResponses(response.data);
      })
      .catch(error => {
        console.error('Error fetching responses:', error);
      });
  }, []);

  // Handle changes in the search input
  const handleSearchPollIdChange = (e) => {
    setSearchedPollId(e.target.value);
  };

  // Filter and update titles and responses based on the searched poll ID
  useEffect(() => {
    if (searchedPollId) {
      // Filter polls based on the searched poll ID
      const filteredPolls = polls.filter(poll => poll.id === searchedPollId);

      if (filteredPolls.length > 0) {
        // Filter responses based on the searched poll ID
        const associatedResponses = responses.filter(response => response.poll_id === searchedPollId);
        //total count of responses
        const totalCount = associatedResponses.reduce((acc,response)=> acc +response.count, 0)

        // Set filtered titles and responses with counts
        setFilteredTitles([filteredPolls[0].title]);
        setFilteredResponses(
          associatedResponses.map(response => `${response.response} (Count: ${response.count}), (Percentage: ${(response.count/totalCount * 100) .toFixed(2)}%)`)
        );
      } else {
        // If no matching poll is found, clear filtered titles and responses
        setFilteredTitles([]);
        setFilteredResponses([]);
      }
    } else {
      // If no poll ID is entered, clear filtered titles and responses
      setFilteredTitles([]);
      setFilteredResponses([]);
    }
  }, [searchedPollId, polls, responses]);

  // Render the component
  return (
    <div className='view-answer-container'>
      <h1>Poll answers</h1>

      {/* Input for entering the poll ID to search */}
      <input
        type="text"
        value={searchedPollId}
        onChange={handleSearchPollIdChange}
        placeholder="Enter Poll ID to search"
        style={{ width: '300px', height: '40px', fontSize: '25px' }}
      />

      {/* Display filtered titles and responses with counts */}
      <div className='view-id-container'>
        <ul>
          <h2 style={{ fontSize: '30px' }}>Title</h2>
          {filteredTitles.map((title, index) => (
            <p key={index}>{title}</p>
          ))}
        </ul>

        <ul>
          <h3 style={{ fontSize: '30px' }}>Responses</h3>
          {filteredResponses.map((respo, index) => (
            <p key={index}>{respo}</p>
          ))}
        </ul>
      </div>
    </div>
  );
}

// Export the component
export default ViewAnswers;
