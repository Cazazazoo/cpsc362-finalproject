import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

function ViewAnswers() {
  ChartJS.register(ArcElement, Tooltip, Legend);
  ChartJS.defaults.font.size = 25;
  const { pollID } = useParams();
  // State to store poll data
  const [pollInfo, setPollInfo] = useState({});
  // State to store response data
  const [responses, setResponses] = useState([]);

  // Fetch poll data when the component mounts
  useEffect(() => {
    Axios.post(`http://localhost:3001/getpoll`, { pollID })
      .then(response => {
        console.log(response.data);
        setPollInfo(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching poll data:', error);
      });
  }, []);

  // Fetch response data when the component mounts
  useEffect(() => {
    Axios.post('http://localhost:3001/getresponses', { pollID })
      .then(response => {
        console.log(response.data);
        setResponses(response.data);
      })
      .catch(error => {
        console.error('Error fetching responses:', error);
      });
  }, []);
  
  const chartData = {
    labels: responses.map(response => response['response']),
    datasets: [
      {
        label: 'Number of Votes',
        data: responses.map(response => response['count']),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: [
          '#14639a'
        ],
      },
    ],
  };

  // Render the component
  return (
    <div className='view-answer-container'>
      <h1>Poll answers</h1>
      <h2>{pollInfo['title']}</h2>
      <div className='pie-chart-container' style={{ display: 'flex', justifyContent: 'center'}}>
        <Pie data={chartData} />
      </div>
    </div>
  );
}

// Export the component
export default ViewAnswers;
