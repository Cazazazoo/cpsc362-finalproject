import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './newpoll.css';

function NewPoll () {
    // Function to set the page title
    const setPageTitle = (title) => {
      document.title = title;
    };
    useEffect(() => {
      setPageTitle("New Poll");
    }, []);

    // Keep track of the number of options the poll being created has, default of 2
    const [optionCount, setOptionCount] = useState(2);

    // Add options to poll
    const handleAddOption = () => { 
      // Maximum of 6 options     
      if (optionCount < 6) {
        setOptionCount(optionCount + 1);
      } else {
        alert("You've reached the maximum number of options (6).");
      }
    };

    // Remove options from poll
    const handleRemoveOption = (e) => {
      // Only allow removal when there are more than 2 options
      if (optionCount > 2) {
        setOptionCount(optionCount - 1);
      }
    };
    
    // pollTopic and setTopic, which will hold the current state value and a function to update that state. useState(''): 
    // This is a call to the useState hook. It initializes the state variable pollTopic with an initial value of an empty string (''). 
    // The setTopic function is used to update the value of pollTopic.
    const [pollTitle, setTitle] = useState('');
    const [pollResponses, setResponses] = useState({});

    // get user input for the topic of the poll
    const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handlePollResponses = (e) => {
      // Add the user input to the pollResponses object
      setResponses({ ...pollResponses, [e.target.name]: e.target.value });
    };

    const createPollID = () => {
      // Generate a random string of 4 alphabetical characters
      // Code taken from https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
      var s = "abcdefghijklmnopqrstuvwxyz";
      const randomString = Array(4).join().split(',').map(function() { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
      return randomString;
    };

    const sendPollData = () => {
      const pollID = createPollID();
      const pollData = {pollID, pollTitle, pollResponses}

      // Make an HTTP POST request to send the data to the server
      Axios.post('http://localhost:3001/newPoll', pollData)
        .then((response) => {
          console.log('response.data: ', response.data);          
        })
        .catch((error) => {
          // Handle any errors (e.g., display an error message)
          alert('An error occurred while creating the poll.');
          console.error(error);
        });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(pollTitle);
      console.log(pollResponses);
      sendPollData();
    };

    return (
      <div className='new-poll-container'>   
        <form onSubmit={handleSubmit}
          className="poll-form"
          id="createNewPoll"
        >
          <h1 className="title"> Create New Poll </h1>
          <div className="poll-input-group">
            <input
              type="text"
              className="poll-form-title"
              name="title"
              value={pollTitle}
              onChange={handleTitleChange}
              autofocus
              placeholder="Poll Topic"
              required
            ></input>
          </div>
          <br/>
        {/* Render option input fields dynamically based on optionCount */}
        {Array.from({ length: optionCount }).map((_, index) => (
          <div className="poll-input-group" key={index}>
            <input
              type="text"
              className="poll-input"
              name={`response${index + 1}`}
              placeholder={`Option ${index + 1}`}
              required
              onChange={handlePollResponses}
            />
          </div>
          ))}
          <br />
          <button className="add-option-button" type="button" onClick={handleAddOption}>
            Add Option
          </button>
          <br/>
          <button className="remove-option-button" type="button" onClick={handleRemoveOption}>
            Remove Option
          </button>
          <br/>
          < br/>
          <button className="poll-button" type="submit">
            {/* give it a random 4 number combination */}
            {" "}
            Submit
          </button>
          <p class="form__text">
          </p>
          
        </form>
      </div>
    );
}

export default NewPoll;