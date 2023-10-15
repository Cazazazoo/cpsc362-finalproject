import React from 'react';
import { useEffect } from 'react';


function NewPoll () {
    // Function to set the page title
    const setPageTitle = (title) => {
      document.title = title;
    };
    useEffect(() => {
      setPageTitle("New Poll");
    }, []);

    return (
      <div className='new-poll-container'>   
        <form
          className="poll-form"
          id="createNewPoll"
        >
          <h1 className="form__title"> Create New Poll </h1>
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
          <br/>
          <div className="poll-input-group">
            <input
              type="text"
              className='poll-input'
              name="option3"
              autofocus
              placeholder="Option 3"
            ></input>
          </div>
          <br/>
          <button className="form__button" type="submit">
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