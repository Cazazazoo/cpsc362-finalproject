import React, { useState } from 'react';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission here, for example, by sending the data to a server.
  };

  return (
    <div className='signup-container'>
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
        <button type='submit'
        style={{ width: '100px', height: '30px', fontSize: '20px' }}>
          Log In
        </button>
        
      </form>
    </div>
  );
}

export default Login;
