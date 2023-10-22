import React, { useState } from 'react';
import Axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signup = () => {
    Axios.post('http://localhost:3001/signup',
      {username: username, password: password,
      }).then((response) => {
        setResponseMessage('Added user to database.');
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup();
  };

  return (
    <div className='signup-container'>
      <h1>Sign up!!</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type='text'
            value={username}
            onChange={handleUsernameChange}
            style={{ width: '300px', height: '40px', fontSize: '25px' }}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type='password'
            value={password}
            onChange={handlePasswordChange}
            style={{ width: '300px', height: '40px', fontSize: '25px' }} 
          />
        </div>
        <button type='submit'
        style={{ width: '100px', height: '30px', fontSize: '20px' }}>
          Sign Up
        </button>
        <p>{responseMessage}</p>
        <div>
          <p>Stored Username: {username}</p>
          <p>Stored Password: {password}</p>
        </div>
        
      </form>
    </div>
  );
}

export default Signup;
