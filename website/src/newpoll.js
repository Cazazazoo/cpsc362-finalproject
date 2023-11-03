import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Axios from 'axios';
import './Newpoll.css';

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
    const [pollTopic, setTopic] = useState('');
    const [pollOptions, setPollOptions] = useState('');
    const [pollData, setPollData] = useState({});

    // get user input for the topic of the poll
    const handleTopicChange = (e) => {
      setTopic(e.target.value);
    };

    // still figuring this out
    const handleOptionsChange = (e) => {
      setPollOptions(e.target.value);
    };
  
    // submit poll
    const handleSubmit = (e) => {
      e.preventDefault();

      // Prepare the poll data to send to the server
      const pollData = {
        topic: pollTopic,
        options: pollOptions.split(',').map((option) => option.trim()),
      };

      // Make an HTTP POST request to send the data to the server
      Axios
        .post('http://localhost:3000/newPoll', pollData) // Adjust the URL to match your backend route
        .then((response) => {
          // Handle the response from the server (e.g., display a success message)
          alert('Added poll to JSON.');
          // Clear the form fields if needed
          setTopic('');
          setPollOptions('');
        })
        .catch((error) => {
          // Handle any errors (e.g., display an error message)
          alert('An error occurred while creating the poll.');
          console.error(error);
        });
    };

    return (
      <div className='new-poll-container'>   
        <form onSubmit={handleSubmit}
          className="poll-form"
          id="createNewPoll"
        >
          <h1 className="poll_title"> Create New Poll </h1>
          <div className="poll-input-group">
            <input
              type="text"
              className="poll-form-topic"
              name="topic"
              value={pollTopic}
              onChange={handleTopicChange}
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
              name={`option${index + 1}`}
              autoFocus
              placeholder={`Option ${index + 1}`}
              required
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