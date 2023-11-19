import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


function ViewPoll () {
  const navigate = useNavigate();

  // State to store poll data
  const [pollData, setPollData] = useState(null);
  // State to store response data
  const [responses, setResponses] = useState([]);
  // State to store filtered poll titles
  const [filteredTitle, setFilteredTitle] = useState('');
  // State to store filtered responses
  const [filteredResponses, setFilteredResponses] = useState([]);

  // State to track the selected option
  const [selectedOption, setSelectedOption] = useState(null);

  // Four-digit code to fetch the specific poll
  const code = 'asdf'; // Replace with the actual code or get it dynamically
  // Redirect to the specified poll
  useEffect(() => {
    navigate(`/viewpoll/${code}`);
  }, [code, navigate]);

  // Fetch poll data when the component mounts
  useEffect(() => {
    Axios.get(`http://localhost:3001/polls`)
      .then(response => {
        setPollData(response.data);
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

  // // UseEffect to fetch poll data from the server based on the code
  // useEffect(() => {
  //   fetch(`http://localhost:3001/polls/${code}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPollData(data);
  //     })
  //     .catch((error) => console.error('Error fetching data:', error));
  // }, [code]);

  // Filter and update titles and responses based on the searched poll ID
  useEffect(() => {
    if (code && pollData && responses) {
      // Filter polls based on the searched poll ID
      const filteredPoll = pollData.find(poll => poll.id === code);
      console.log('Filtered Poll:', filteredPoll);

      // there is at least one poll that matches the specified condition.
      if (filteredPoll) {
        // Filter responses based on the searched poll ID
        const associatedResponses = responses.filter(response => response.poll_id === code);
        // //total count of responses
        // const totalCount = associatedResponses.reduce((acc,response)=> acc + response.count, 0);
  
        // Set filtered titles and responses with counts
        setFilteredTitle([filteredPoll.title]);
        setFilteredResponses(associatedResponses);
        console.log('Filtered Responses:', filteredResponses);
      } else {
        // If no matching poll is found, clear filtered titles and responses
        setFilteredTitle('');
        setFilteredResponses([]);
      }
    } else {
      // If no poll ID is entered, clear filtered titles and responses
      setFilteredTitle('');
      setFilteredResponses([]);
    }
  }, [code, pollData, filteredResponses, responses]);
  

  // Function to handle option selection
  const handleOptionSelect = (responseID) => {
    console.log('Response ID:', responseID);

    // Update the state
    setSelectedOption(responseID);
  };

  // useEffect to log the selected option after the state is updated
  useEffect(() => {
    console.log('Selected Option:', selectedOption);
  }, [selectedOption]);
  
  // Function to send the selected option to the server
  const sendOptionSelected = (selectedOption) => {
    // Make an HTTP POST request to update the count in the database
    Axios.post('http://localhost:3001/updateResponseCount', {
      poll_id: code, // Assuming code is the poll ID
      response_id: selectedOption,
    })
      .then((response) => {
        console.log('Response from server:', response.data);
        // Handle success if needed
      })
      .catch((error) => {
        // Handle any errors (e.g., display an error message)
        alert('An error occurred while updating response count.');
        console.error(error);
      });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if an option is selected
    if (selectedOption == null) {
      // If no option is selected, display an error message or take appropriate action
      alert('Please select an option before submitting.');
      return;
    }

    sendOptionSelected();
  };

  // Your component UI goes here
  return (
    <div className='view-poll-container'>
      {filteredTitle && (
        <>
          <h1>{filteredTitle}</h1>
          <form onSubmit={handleSubmit}>
            {/* Map through filtered responses and create radio buttons for each */}
            {filteredResponses.map((response) => (
              <div key={response.id} className='option'>
                <label>
                  <input
                    type='radio'
                    name='pollOption'
                    value={response.id}
                    onChange={() => handleOptionSelect(response.id)}
                    checked={selectedOption === response.id}
                  />
                  {response.response}
                </label>
              </div>
            ))}
            <button type='submit'>Submit</button>
          </form>
        </>
      )}
    </div>
  );
}

export default ViewPoll;