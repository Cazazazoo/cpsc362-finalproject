import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './viewpoll.css';


function ViewPoll () {
  // navigating to answers page
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

  const { pollID } = useParams();
  useEffect(() => {
    // Now 'code' contains the value from the URL, do something with it
    console.log('Code from URL:', pollID);

    // Fetch additional data or perform other actions based on the code
  }, [pollID]);

  // Function to set the page title
  const setPageTitle = (title) => {
    document.title = title;
  };
  useEffect(() => {
    setPageTitle(`View Poll - ${pollID}`);
  }, [pollID]);

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

  // Filter and update titles and responses based on the searched poll ID
  useEffect(() => {
    if (pollID && pollData && responses) {
      // Filter polls based on the searched poll ID
      const filteredPoll = pollData.find(poll => poll.id === pollID);
      console.log('Filtered Poll:', filteredPoll);

      // there is at least one poll that matches the specified condition.
      if (filteredPoll) {
        // Filter responses based on the searched poll ID
        const associatedResponses = responses.filter(response => response.poll_id === pollID);
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
  }, [pollID, pollData, responses]);
  

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
  const sendOptionSelected = () => {
    const optionData = {pollID, selectedOption};
    // Make an HTTP POST request to update the count in the database
    Axios.post('http://localhost:3001/updateResponseCount', optionData)
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

    console.log(pollID);
    console.log(selectedOption);

    // Check if an option is selected
    if (selectedOption == null) {
      // If no option is selected, display an error message or take appropriate action
      alert('Please select an option before submitting.');
      return;
    }

    sendOptionSelected();
    navigate({pathname: `/viewanswers/${pollID}`});
  };

  const copyLinkToClipboard = () => {
    const currentURL = window.location.href;

    // Copy the URL to the clipboard
    navigator.clipboard.writeText(currentURL)
      .then(() => {
        // Show a pop-up indicating successful copy
        window.alert('Link Copied!');
      })
      .catch((error) => {
        // Handle errors, e.g., browser doesn't support clipboard API
        console.error('Error copying to clipboard:', error);
      });
  };

  const copyPollIDToClipboard = () => {
    // Copy the URL to the clipboard
    navigator.clipboard.writeText(pollID)
      .then(() => {
        // Show a pop-up indicating successful copy
        window.alert('poll ID Copied!');
      })
      .catch((error) => {
        // Handle errors, e.g., browser doesn't support clipboard API
        console.error('Error copying to clipboard:', error);
      });
  };

  // component UI goes here
  return (
    <div className='view-poll-container'>
      {filteredTitle && (
        <>
          <h1>{filteredTitle}</h1>
          <form onSubmit={handleSubmit}>
            {/* Map through filtered responses and create radio buttons for each */}
            {filteredResponses.map((response) => (
              <div key={response.id} className='option'>
                  <input
                    type='radio'
                    name='pollOption'
                    value={response.id}
                    onChange={() => handleOptionSelect(response.id)}
                    checked={selectedOption === response.id}
                  />
                  <label>{response.response}</label>
              </div>
            ))}
            <button className="vote-button" type='submit'>Submit</button>
          </form>
          <button onClick={copyLinkToClipboard} className='copy-link-button'>Copy Link</button>
          <button onClick={copyPollIDToClipboard} className='copy-pollid-button'>Copy Poll ID</button>
        </>
      )}
    </div>
  );
}

export default ViewPoll;