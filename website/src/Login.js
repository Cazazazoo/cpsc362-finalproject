import React, { useState } from 'react';
import Axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const login = () => {
    Axios.post('http://localhost:3001/login',
      {username: username, password: password,
      }).then((response) => {
        console.log(response);
        if (username === response.data.username && password === response.data.password) {
          setResponseMessage('Found user in database.')
        } else {
          console.log(response.data.username, response.data.password);
          console.log(username, password);
          setResponseMessage('User not found in database.')
        }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      setResponseMessage('Please fill in all fields.');
      return;
    }
    
    login();

  };

  return (
    <div className='login-container'>
      <h1>Log In</h1>
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
        <button type='submit' style={{ width: '100px', height: '30px', fontSize: '20px' }}>Log In</button>
        <p>{responseMessage}</p>
        <div>
          <p>Stored Username: {username}</p>
          <p>Stored Password: {password}</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
