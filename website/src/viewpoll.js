import React, { useState, useEffect } from 'react';


function ViewPoll () {
    // State to store poll data
    const [pollData, setPollData] = useState(null);

    // // UseEffect to fetch poll data from the database
    // useEffect(() => {
    //     // Fetch data from the database and update pollData state
    //     // You can use a library like Axios or fetch API for this
    // }, []); // Empty dependency array means it will run once when the component mounts

    // Your component UI goes here
            // {/* if else */}
            // {pollData ? (
            //     <>
            //         <h1>{pollData.title}</h1>
            //         {/* Display other poll details */}
            //     </>
            //     ) : (
            //     <p>Loading...</p>
            //     )}

  // UseEffect to fetch poll data from the database
  useEffect(() => {
    // Simulating data fetching for now
    const sampleData = {
      title: "Cows or Pigs?",
      options: [
        { id: 1, text: "Cows", percent: 55 },
        { id: 2, text: "Pigs", percent: 45 },
      ],
    };

    // Update pollData state with sample data
    setPollData(sampleData);
  }, []); // Empty dependency array means it will run once when the component mounts

  // Your component UI goes here
  return (
    <div className='view-poll-container'>
      <h1>
        {pollData ? pollData.title : "Loading..."}
      </h1>
      <div className="poll-area">
        {/* Map through options and create labels for each */}
        {pollData &&
          pollData.options.map((option) => (
            <label key={option.id} htmlFor={`opt-${option.id}`} className={`opt-${option.id}`}>
              <div className="row">
                <div className="column">
                  <span className="circle"></span>
                  <span className="text">{option.text}</span>
                </div>
                <span className="percent">{`${option.percent}%`}</span>
              </div>
              <div className="progress" id={`pstyle${option.id}`} style={{ '--w': option.percent }}></div>
            </label>
          ))}
      </div>
    </div>
    );
}

export default ViewPoll;