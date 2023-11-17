import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function ViewAnswers() {
  const [titles, setTitles] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/test')
      .then(response => {
        // Extract the titles from the response data
        const titleValues = response.data.map(item => item.title);
        setTitles(titleValues);
        const idVals = response.data.map(item => item.id);
        setIds(idVals);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  return (
    <div className='view-answer-container'>
      <h1>Poll answers</h1>
    
      <div className='view-id-container'>
      <ul>
      <p style={{ fontSize: '25px' }}>Id's</p>
          {ids.map((id, index) => (
            <p key={index}>{id}</p>
          ))}
        </ul>
        
        <ul>
        <p style={{ fontSize: '25px' }}>Titles</p>
          {titles.map((title, index) => (
            <p key={index}>{title}</p>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewAnswers;
