import React from 'react';
import { useEffect } from 'react';
import './newpoll.css';



function NewPoll () {
    // Function to set the page title
    const setPageTitle = (title) => {
      document.title = title;
    };
    useEffect(() => {
      setPageTitle("New Poll");
    }, []);

    const handleAddOption = () => {
      const form = document.getElementById("createNewPoll");
      const newInput = document.createElement("input");
      newInput.type = "text";
      newInput.className = "poll-input";
      newInput.name = `option${form.elements.length - 2}`;
      newInput.autofocus = true;
      newInput.placeholder = `Option ${form.elements.length - 2}`;
      newInput.required = true;
      form.insertBefore(newInput, document.querySelector(".add-option-button"));
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      // You can handle form submission here, for example, by sending the data to a server.
    };

    return (
      <div className='new-poll-container'>   
        <form
          className="poll-form"
          id="createNewPoll"
        >
          <h1 className="poll_title"> Create New Poll </h1>
          <div className="poll-input-group">
            <input
              type="text"
              className="poll-form-topic"
              name="topic"
              autofocus
              placeholder="Poll Topic"
              required
            ></input>
          </div>
          <br/>
          <div className="poll-input-group">
            <input
              type="text"
              className="poll-input"
              name="option1"
              autofocus
              placeholder="Option 1"
              required
            ></input>
          </div>
          <br/>
          <div className="poll-input-group">
            <input
              type="text"
              className="poll-input"
              name="option2"
              autofocus
              placeholder="Option 2"
              required
            ></input>
          </div>
          <br />
          <button className="add-option-button" type="button" onClick={handleAddOption}>
            Add Option
          </button>
          <br/>
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